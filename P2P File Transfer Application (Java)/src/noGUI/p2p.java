// package src.noGUI;

import java.net.*;
import java.io.*;

/* PROTOCOL:
1) Connect peers with sender as host, and reciever as client using TCP
2) Send file name from sender to receiver
3) Send file size from sender to receiver
4) Send file in n sized chunks from sender to receiver, where n is a globally defined constant
5) Close connection from receiver's end
*/

public class p2p {

    // Constant for port number used by peers
    final static int port = 3000;

    // Constant for number of bytes to send to TCP at once
    final static int chunkSize = 16384;

    public static void main(String[] args) throws Exception {
        // Check usage
        if (args.length == 0) {
            printUsage();
            System.exit(0);
        }
        if (!(args[0].equals("rec") || args[0].equals("send"))) {
            printUsage();
            System.exit(0);
        }

        if (args[0].equals("send")) { // SENDING (SERVER)
            // Check usage
            if (!(args.length == 2 || args.length == 3)) {
                printUsage();
                System.exit(0);
            }
            // Get user input values
            final String filename = args[1];
            File file = new File(filename);
            int parallelCountTotal = 0;
            if (args.length == 3) {
                parallelCountTotal = Integer.parseInt(args[2]);
            }

            // Open TCP server socket
            ServerSocket serverSocket = new ServerSocket(port);
            // System.out.println("Socket Opened");
            // serverSocket.setSoTimeout(200000);

            // Connect with clients until server closes
            if (parallelCountTotal <= 0) {
                while (!serverSocket.isClosed()) {
                    // Connect & start new server thread
                    Socket clientSocket = serverSocket.accept();
                    newServerThread(file.getName(), file.getAbsolutePath(), clientSocket);
                }
            }

            // Wait until parallelCountTotal clients connected before sending
            if (parallelCountTotal >= 0) {
                int parallelCount = 0; // Client connection counter
                Socket[] clients = new Socket[parallelCountTotal]; // Save client list to delay start
                while (parallelCount < parallelCountTotal) {
                    // Ready all connections
                    clients[parallelCount] = serverSocket.accept();
                    parallelCount++;
                }
                // Start all connections once total reached
                long timerStart = System.currentTimeMillis(); // Start timer
                for (Socket client : clients) {
                    newServerThread(file.getName(), file.getAbsolutePath(), client);
                }

                // Wait for all connections to close
                boolean allClosed = false;
                while (!allClosed) {
                    for (Socket client : clients) {
                        if (!client.isClosed()) {
                            break;
                        }
                        allClosed = true;
                    }
                }
                long timing = System.currentTimeMillis() - timerStart; // End timer
                System.out.println(timing); // Output timing to stdout
                serverSocket.close();
            }

        } else { // RECIEVING (CLIENT)
            // Check usage
            if (!(args.length == 2 || args.length == 3)) {
                printUsage();
                System.exit(0);
            }
            // Get user input values
            final String hostname = args[1];

            // Open TCP client socket & stream
            Socket socket = new Socket(hostname, port);
            System.out.println("Connected!");
            DataInputStream inputStream = new DataInputStream(socket.getInputStream());

            // Read file name from socket
            String filename = inputStream.readUTF();
            
            // Replace if specified otherwise
            if(args.length == 3){
                filename = args[2];
            }

            // Read file size from socket
            int fileSize = inputStream.readInt();

            // Create file
            FileOutputStream fileOutputStream = new FileOutputStream(filename);

            // File chunk counters & buffer
            int chunkCount = 0;
            int totalChunks = fileSize / chunkSize;
            byte[] readBuffer = new byte[chunkSize];

            // Receive all chunks, writing each to the file
            while (chunkCount < totalChunks) {
                // System.out.println("Receiving chunk " + chunkCount + "/" + totalChunks);
                inputStream.readFully(readBuffer);
                // System.out.println("Chunk " + chunkCount + "/" + totalChunks + " received");
                fileOutputStream.write(readBuffer);
                fileOutputStream.flush();
                // System.out.println("Chunk " + chunkCount + "/" + totalChunks + " written");
                // System.out.println("Chunk received: " + new String(readBuffer));
                chunkCount += 1;
            }
            // Receive remaining bytes
            int remainingByteCount = fileSize % chunkSize;
            if (remainingByteCount != 0) {
                readBuffer = new byte[remainingByteCount];
                inputStream.readFully(readBuffer);
                fileOutputStream.write(readBuffer);
                fileOutputStream.flush();
            }

            // Close file & TCP connection
            System.out.println("File received");
            fileOutputStream.close();
            inputStream.close();
            socket.close();
            System.out.println("Connection closed");
        }
    }

    // Method to be called when a connection is made to the sender
    private static void newServerThread(String filename, String filepath, Socket clientSocket) {
        // New thread
        (new Thread(new Runnable() {

            @Override
            public void run() {
                try {
                    // Open output stream
                    DataOutputStream outputStream = new DataOutputStream(clientSocket.getOutputStream());

                    // Send filename
                    outputStream.writeUTF(filename);
                    outputStream.flush();

                    // Open file to read
                    File file = new File(filepath);

                    // Send file length to reciever
                    int fileLength = (int) file.length();
                    outputStream.writeInt(fileLength);
                    outputStream.flush();

                    try {
                        // Open file to read
                        FileInputStream fileStream = new FileInputStream(filepath);

                        // Split file into chunks & count
                        int chunkCount = 0;
                        int totalChunks = fileLength / chunkSize;
                        byte[] readBuffer = new byte[chunkSize];

                        // Send all chunks
                        while (chunkCount < totalChunks) {
                            // System.out.println("Sending chunk " + chunkCount + "/" + totalChunks);
                            fileStream.read(readBuffer);
                            outputStream.write(readBuffer);
                            // System.out.println("Chunk " + chunkCount + "/" + totalChunks + " sent");
                            chunkCount += 1;
                            // System.out.println("Chunk sent: " + new String(readBuffer));
                        }
                        // Send remaining bytes
                        int remainingByteCount = fileLength % chunkSize;
                        if (remainingByteCount != 0) {
                            // System.out.println("Sending remaining bytes");
                            readBuffer = new byte[remainingByteCount];
                            fileStream.read(readBuffer);
                            outputStream.write(readBuffer);
                        }
                        // Close file
                        fileStream.close();
                    } catch (IOException exception) {
                        System.out.println("Error when reading file to send: " + exception.getMessage());
                    }

                    // Flush & close stream
                    outputStream.flush();
                    outputStream.close();

                } catch (IOException e) {
                    System.out.println("IO Exception When Sending Files: " + e.getMessage());
                }
            }
        })).run();
    }

    // Method to print usage when user makes incorrect use of interface
    private static void printUsage() {
        System.out.println("Missing Parameters!");
        System.out
                .println("Usage: " + "\n Sending File: java p2p send <filename> <[optional] parallel-connection-count>"
                        + "\n Receiving File: java p2p rec <hostname> <[optional] filename>");
    }
}

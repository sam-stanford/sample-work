// package src;

import java.net.*;
import java.nio.file.FileAlreadyExistsException;
import java.io.*;
import javax.swing.*;
import java.awt.*;
import java.awt.event.*;

/* PROTOCOL:
1) Connect peers with sender as host, and reciever as client using TCP
2) Send file size from sender to reciever
3) Send file size number of bytes as sender, and read from socket as reciever
4) Create file on reader's end
*/

public class p2p {

    // Constant for port number used by peers
    final static int port = 3000;

    // Constant for number of bytes to send to TCP at once
    final static int chunkSize = 16384;

    // Path to UFIP words CSV file
    final static String ufipWordsFilepath = "./assets/UserFriendlyIPWords.csv";

    // Global variables for font styles
    static Font headingFont = new Font("Sans-Serif", Font.BOLD, 24);
    static Font buttonFont = new Font("Sans-Serif", Font.PLAIN, 16);
    static Font labelFont = new Font("Sans-Serif", Font.PLAIN, 14);
    static Font smallLabelFont = new Font("Sans-Serif", Font.PLAIN, 12);
    static Font inputFieldFont = new Font("Sans-Serif", Font.PLAIN, 14);

    // Global variable for server socket
    static ServerSocket serverSocket = null;

    // Global JFrame & JPanels for swapping
    static JFrame frame = null;
    static HomePanel homePanel = null;
    static SendingPanel sendPanel = null;
    static ReceivingPanel recPanel = null;

    // Global panel components
    static JProgressBar recProgBar = null;
    static JFileChooser sendFileChooser = null;
    static JFileChooser recFileChooser = null;
    static JLabel recErrLabel = null;
    static JLabel sendErrLabel = null;

    // Main method
    public static void main(String[] args) throws Exception {

        // JFrame creation
        frame = new JFrame("P2P Send/Receive Files");
        // frame.setSize(600, 600);
        // frame.setMinimumSize(new Dimension(400, 400));
        frame.setLayout(null);
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.setLocationRelativeTo(null);
        frame.setResizable(false);
        frame.setIconImage(new ImageIcon("./assets/p2p_logo.png").getImage());

        // Panel instantiations
        sendPanel = new SendingPanel();
        recPanel = new ReceivingPanel();
        homePanel = new HomePanel();
        frame.add(sendPanel);
        frame.add(recPanel);
        frame.add(homePanel);

        // Render frame
        frame.setContentPane(homePanel);
        frame.pack();
        frame.setVisible(true);

    } // End main

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
                    int fileLength = (int) file.length(); // Extension to fix this
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

    // Method to be called if files are to be sent (i.e. SERVER)
    private static void sendFiles(int port, String filename, String filepath) {
        try {
            // Clear error
            (new SwingWorker<Void, Void>() {
                @Override
                protected Void doInBackground() throws Exception {
                    sendErrLabel.setText(" ");
                    return null;
                }
            }).execute();
            // Open TCP server socket
            serverSocket = new ServerSocket(port);
            // serverSocket.setSoTimeout(200000)
            while (!serverSocket.isClosed()) {
                // Connect with client
                Socket clientSocket = serverSocket.accept();
                // Create sending thread
                newServerThread(filename, filepath, clientSocket);
            }

        } catch (IOException e) {
            System.out.println("IO Exception When Setting Up Server: " + e.getMessage());
        }
    }

    // Method to be called if files are to be received (i.e. CLIENT)
    private static void getFiles(int port, String dirpath, String hostname) {

        try {
            // Open TCP client socket & stream
            Socket socket = new Socket(hostname, port);
            // System.out.println("Connected!");
            DataInputStream inputStream = new DataInputStream(socket.getInputStream());

            // Construct filepath and check file doesn't exist
            String filename = inputStream.readUTF();
            String filepath = dirpath + File.separator + filename;
            if ((new File(filepath).getAbsoluteFile().exists())) {
                // Throw exception if file exists
                socket.close();
                throw new FileAlreadyExistsException(filepath);
            }

            // Clear error
            recErrLabel.setText(" ");

            // Create file
            FileOutputStream fileOutputStream = new FileOutputStream(filepath);

            // Read file size from socket
            int fileSize = inputStream.readInt();

            // File chunk counters & buffer
            int chunkCount = 0;
            int totalChunks = fileSize / chunkSize;
            byte[] readBuffer = new byte[chunkSize];

            // Receive all chunks, writing each to the file
            while (chunkCount < totalChunks) {
                // System.out.println("Receiving chunk " + chunkCount + "/" + totalChunks);
                double percent = ((double) chunkCount) / ((double) totalChunks) * 100.0;
                (new SwingWorker<Void, Void>() {
                    @Override
                    protected Void doInBackground() throws Exception {
                        int valueToSet = (int) Math.round(percent);
                        if (percent < 100 && percent > 99)
                            valueToSet = 99;
                        recProgBar.setValue(valueToSet);
                        // System.out.println((int) Math.round(percent));
                        frame.setVisible(true);
                        return null;
                    }
                }).execute();
                inputStream.readFully(readBuffer);
                // System.out.println("Chunk " + chunkCount + "/" + totalChunks + " received");
                fileOutputStream.write(readBuffer);
                fileOutputStream.flush();
                // System.out.println("Chunk " + chunkCount + "/" + totalChunks + " written");
                chunkCount += 1;
            }
            // Receive remaining bytes
            int remainingByteCount = fileSize % chunkSize;
            if (remainingByteCount != 0) {
                readBuffer = new byte[remainingByteCount];
                inputStream.readFully(readBuffer);
                fileOutputStream.write(readBuffer);
            }

            // Set progress bar to 100%
            (new SwingWorker<Void, Void>() {

                @Override
                protected Void doInBackground() throws Exception {
                    recProgBar.setValue(100);
                    frame.setVisible(true);
                    return null;
                }
            }).execute();

            // Close file
            fileOutputStream.flush();
            fileOutputStream.close();

            // Close TCP connection
            inputStream.close();
            socket.close();

        } catch (FileAlreadyExistsException e) {
            recErrLabel.setText("This file already exists!");
        } catch (IOException e) {
            recErrLabel.setText("Could not connect to sender. Please check the unique code you have entered");
            System.out.println("IO Exception When Receiving File: " + e.getMessage());
        }

    }

    // JPanel for home screen
    public static class HomePanel extends JPanel {

        private static final long serialVersionUID = 1L; // Keep compiler happy

        public HomePanel() {
            // Layout setup
            setLayout(new GridBagLayout());
            GridBagConstraints c = new GridBagConstraints();
            c.fill = GridBagConstraints.BOTH;

            // Heading
            JLabel welcomeLabel = new JLabel("P2P Send/Receive Files");
            welcomeLabel.setFont(headingFont);
            c.gridx = 0;
            c.gridy = 0;
            c.insets = new Insets(40, 40, 20, 40);
            add(welcomeLabel, c);

            // Choose sending button & listener
            JButton selectSendBtn = new JButton("Send Files");
            selectSendBtn.setFont(buttonFont);
            c.gridx = 0;
            c.gridy = 1;
            c.ipady = 20;
            c.insets = new Insets(10, 40, 10, 40);
            add(selectSendBtn, c);

            selectSendBtn.addActionListener(new ActionListener() {
                @Override
                public void actionPerformed(ActionEvent e) {
                    frame.setContentPane(sendPanel);
                    frame.pack();
                    frame.setVisible(true);
                }
            });

            // Choose receiving button * listener
            JButton selectRecBtn = new JButton("Receive Files");
            selectRecBtn.setFont(buttonFont);
            c.gridx = 0;
            c.gridy = 2;
            c.ipady = 20;
            c.insets = new Insets(10, 40, 40, 40);
            add(selectRecBtn, c);

            selectRecBtn.addActionListener(new ActionListener() {
                @Override
                public void actionPerformed(ActionEvent e) {
                    frame.setContentPane(recPanel);
                    frame.pack();
                    frame.setVisible(true);
                }
            });
        }

    }

    // JPanel for sending screen
    public static class SendingPanel extends JPanel {

        private static final long serialVersionUID = 1L; // Keep compiler happy

        public SendingPanel() {
            // Layout setup
            setLayout(new GridBagLayout());
            GridBagConstraints c = new GridBagConstraints();
            c.fill = GridBagConstraints.BOTH;

            // Heading
            JLabel sendingLabel = new JLabel("Send Files");
            sendingLabel.setFont(headingFont);
            c.gridx = 0;
            c.gridy = 0;
            c.insets = new Insets(20, 20, 10, 20);
            add(sendingLabel, c);

            // Unique code (IP Address) label
            String ipLabelContent = "<html>Unique Code: <b>";
            try {
                // Get this computer's IP address
                String ip = InetAddress.getLocalHost().toString().split("/")[1];

                // Convert to words array
                UserFriendlyIP ufip = new UserFriendlyIP(ufipWordsFilepath);
                String[] ufWords = ufip.ipToWords(ip);

                // Convert array to single string
                for (int i = 0; i < ufWords.length; i += 1) {
                    ipLabelContent = ipLabelContent.concat(ufWords[i]).concat("  ");
                }

                // End formatting
                ipLabelContent = ipLabelContent.concat("</b></html>");

            } catch (Exception e) {
                // Display error
                ipLabelContent = "Error finding IP address of host machine";
            }

            JLabel ipLabel = new JLabel(ipLabelContent);
            ipLabel.setFont(labelFont);
            c.gridy = 1;
            c.insets = new Insets(10, 20, 10, 20);
            add(ipLabel, c);

            sendFileChooser = new JFileChooser();
            sendFileChooser.setControlButtonsAreShown(false);
            c.gridy = 2;
            c.gridwidth = 2;
            add(sendFileChooser, c);

            sendErrLabel = new JLabel(" ");
            sendErrLabel.setFont(smallLabelFont);
            sendErrLabel.setForeground(Color.RED);
            c.gridy = 4;
            c.gridx = 0;
            c.gridwidth = 2;
            c.insets = new Insets(10, 20, 20, 20);
            add(sendErrLabel, c);

            JButton backButton = new JButton("Back");
            backButton.setFont(buttonFont);
            c.gridy = 3;
            c.gridx = 0;
            c.gridwidth = 1;
            c.insets = new Insets(10, 20, 10, 20);
            add(backButton, c);

            backButton.addActionListener(new ActionListener() {
                @Override
                public void actionPerformed(ActionEvent e) {
                    frame.setContentPane(homePanel);
                    frame.pack();
                    frame.setVisible(true);
                }
            });

            String sendFileText = "Send File";
            JButton sendButton = new JButton(sendFileText);
            sendButton.setFont(buttonFont);
            c.gridy = 3;
            c.gridx = 1;
            add(sendButton, c);

            sendButton.addActionListener(new ActionListener() {
                @Override
                public void actionPerformed(ActionEvent e) {
                    if (sendButton.getText().equals(sendFileText)) {
                        // System.out.println("Sending");
                        // Check input
                        String filepath;
                        try {
                            filepath = sendFileChooser.getSelectedFile().getAbsolutePath();
                            if (filepath == null || filepath.equals("")) {
                                sendErrLabel.setText("Please select a valid file");
                                return;
                            }
                        } catch (NullPointerException exception) {
                            sendErrLabel.setText("Please select a valid file");
                            return;
                        }

                        sendButton.setText("Stop");

                        // Start sending - New thread to avoid blocking call on UI
                        (new SwingWorker<Void, Void>() {
                            @Override
                            protected Void doInBackground() {
                                sendFiles(port, sendFileChooser.getSelectedFile().getName(), filepath);
                                return null;
                            }
                        }).execute();

                    } else {
                        try {
                            // Stop sending by closing socket
                            if (serverSocket != null) {
                                serverSocket.close();
                            }
                            // Modify UI
                            sendButton.setText(sendFileText);
                        } catch (IOException exception) {
                            System.out.println("Cannot close socket at the moment: " + exception.getMessage());
                        }
                    }
                }
            });
        }
    }

    // JPanel for receiving screen
    public static class ReceivingPanel extends JPanel {

        private static final long serialVersionUID = 1L; // Keep compiler happy

        String hostIP = "";
        public ReceivingPanel() {
            // Layout setup
            setLayout(new GridBagLayout());
            GridBagConstraints c = new GridBagConstraints();
            c.fill = GridBagConstraints.BOTH;
            c.weightx = 1;

            // Heading
            JLabel recLabel = new JLabel("Receive Files");
            recLabel.setFont(headingFont);
            c.gridx = 0;
            c.gridy = 0;
            c.insets = new Insets(20, 20, 10, 20);
            add(recLabel, c);

            // Unique code input label
            JLabel hostInputLabel = new JLabel("Sender's Unique Code");
            hostInputLabel.setFont(inputFieldFont);
            c.gridy = 1;
            c.insets = new Insets(10, 20, 10, 20);
            add(hostInputLabel, c);

            // Unique code inputs
            JTextField[] hostCodeInputs = new JTextField[4];
            c.gridx = 0;
            c.gridy = 2;
            c.gridwidth = 4;
            add(new JPanel() {
                private static final long serialVersionUID = 1L; // Keep compiler happy
                {
                    setLayout(new GridLayout(1, 4, 10, 0));
                    for (int i = 0; i < hostCodeInputs.length; i += 1) {
                        hostCodeInputs[i] = new JTextField();
                        hostCodeInputs[i].setFont(inputFieldFont);
                        add(hostCodeInputs[i]);
                    }
                }
            }, c);

            recFileChooser = new JFileChooser();
            recFileChooser.setControlButtonsAreShown(false);
            recFileChooser.setFileSelectionMode(JFileChooser.DIRECTORIES_ONLY);
            c.gridx = 0;
            c.gridy = 3;
            c.gridwidth = 4;
            c.insets = new Insets(10, 20, 10, 20);
            add(recFileChooser, c);

            recProgBar = new JProgressBar();
            recProgBar.setStringPainted(true);
            c.gridx = 0;
            c.gridy = 4;
            c.gridwidth = 4;
            c.insets = new Insets(10, 20, 10, 20);
            add(recProgBar, c);

            JButton backButton = new JButton("Back");
            backButton.setFont(buttonFont);
            c.gridx = 0;
            c.gridy = 5;
            c.gridwidth = 2;
            c.weightx = 1;
            c.insets = new Insets(10, 20, 10, 10);
            add(backButton, c);

            backButton.addActionListener(new ActionListener() {
                @Override
                public void actionPerformed(ActionEvent e) {
                    frame.setContentPane(homePanel);
                    frame.pack();
                    frame.setVisible(true);
                }
            });

            String recButtonText = "Get File";
            JButton recButton = new JButton(recButtonText);
            recButton.setFont(buttonFont);
            c.gridx = 2;
            c.gridy = 5;
            c.gridwidth = 2;
            c.weightx = 1;
            c.insets = new Insets(10, 10, 10, 20);
            add(recButton, c);

            recErrLabel = new JLabel(" ");
            recErrLabel.setFont(smallLabelFont);
            recErrLabel.setForeground(Color.RED);
            c.gridx = 0;
            c.gridy = 6;
            c.gridwidth = 4;
            c.insets = new Insets(10, 20, 20, 20);
            add(recErrLabel, c);

            recButton.addActionListener(new ActionListener() {
                @Override
                public void actionPerformed(ActionEvent e) {
                    // System.out.println("Receiving");
                    try {
                        // Convert words to ip
                        String[] words = new String[hostCodeInputs.length];
                        for (int i = 0; i < words.length; i += 1) {
                            String thisWord = hostCodeInputs[i].getText();
                            if (thisWord == null) {
                                // Missing input
                                recErrLabel.setText("Please enter the sender's unique code");
                                return;
                            } else {
                                words[i] = thisWord;
                            }
                        }

                        UserFriendlyIP ufip = new UserFriendlyIP(ufipWordsFilepath);
                        hostIP = ufip.wordsToIp(words);

                    } catch (NullPointerException exception) {
                        recErrLabel.setText("Please enter the sender's unique code");
                        return;
                    } catch (FileNotFoundException exception){
                        recErrLabel.setText("Program data corrupted or missing");
                        return;
                    }

                    try {
                        // Get files - new thread to avoid blocking UI
                        (new SwingWorker<Void, Void>() {
                            @Override
                            protected Void doInBackground() throws Exception {
                                String filepath = recFileChooser.getSelectedFile().getAbsolutePath();
                                if (filepath == null) {
                                    recErrLabel.setText("Please select a valid directory");
                                    return null;
                                }
                                recErrLabel.setText(" ");
                                getFiles(port, filepath, hostIP);
                                return null;
                            }
                        }).execute();

                    } catch (NullPointerException exception) {
                        recErrLabel.setText("Please select a valid directory");
                        return;
                    }
                }
            });
        }

    }

}

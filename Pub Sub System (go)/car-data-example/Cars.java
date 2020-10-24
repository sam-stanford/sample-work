import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLConnection;
import java.nio.charset.StandardCharsets;

import com.google.gson.Gson;

public class Cars {

    public static class CarData {
        int time;
        int carNumber;
        int carSpeed;
        boolean isCarAccel;
        boolean isCarBreaking;
    }

    public static class MessageData {
        String topic;
        byte[] data;
    }

    // Method to send data to pub-sub system
    private static void sendDataToPubSub(int time, int carNumber, int carSpeed, boolean isCarAccel,
            boolean isCarBreaking) throws Exception {

        // Set up POST request to /publish endpoint
        URL url = new URL("http://localhost:3301/publish");
        URLConnection con = url.openConnection();
        HttpURLConnection http = (HttpURLConnection) con;
        http.setRequestMethod("POST");
        http.setDoOutput(true);

        // Marshal data into JSON object in an array
        CarData carData = new CarData();
        carData.time = time;
        carData.carNumber = carNumber;
        carData.carSpeed = carSpeed;
        carData.isCarAccel = isCarAccel;
        carData.isCarBreaking = isCarBreaking;

        String dataAsJson = (new Gson()).toJson(carData);
        byte[] dataAsJsonBytes = dataAsJson.getBytes();

        // Create message and convert to json
        MessageData messageData = new MessageData();
        messageData.topic = "car" + carNumber;
        messageData.data = dataAsJsonBytes;

        String messageAsJson = (new Gson()).toJson(messageData);
        System.out.println(messageAsJson);
        byte[] messagePayload = messageAsJson.getBytes(StandardCharsets.UTF_8);

        // Send requestsa
        http.setFixedLengthStreamingMode(messagePayload.length);
        http.setRequestProperty("Content-Type", "application/json; charset=UTF-8");
        http.connect();
        try (OutputStream os = http.getOutputStream()) {
            os.write(messagePayload);
        }

    }

    // Method to create a topic in pub-sub system
    private static void createPubSubTopic(String topicName) throws Exception {

        // Set up POST request to /publish endpoint
        URL url = new URL("http://localhost:3301/topics");
        URLConnection con = url.openConnection();
        HttpURLConnection http = (HttpURLConnection) con;
        http.setRequestMethod("POST");
        http.setDoOutput(true);

        // Package data JSON string into message payload
        String jsonMessage = "{" + "\"topic\":\"" + topicName + "\"" + "}";
        byte[] messagePayload = jsonMessage.getBytes();

        // Send request
        http.setFixedLengthStreamingMode(messagePayload.length);
        http.setRequestProperty("Content-Type", "application/json; charset=UTF-8");
        http.connect();
        try (OutputStream os = http.getOutputStream()) {
            os.write(messagePayload);
        }

    }

    public static void main(String[] args) throws Exception {

        // Dummy data
        int[] car1SpeedData = { 0, 5, 10, 15, 10, 5, 0 };
        boolean[] car1AccelData = { true, true, true, false, false, false, false };
        boolean[] car1BrakeData = { false, false, false, true, true, true, true };

        int[] car2SpeedData = { 0, 0, 5, 5, 5, 5, 5 };
        boolean[] car2AccelData = { false, true, false, false, false, false, false };
        boolean[] car2BrakeData = { false, false, false, false, false, false, false };

        // Create topic for each car
        createPubSubTopic("car1");
        createPubSubTopic("car2");

        // Send data to pub-sub every half-second
        for (int i = 0; i < car1SpeedData.length; i++) {
            sendDataToPubSub(i, 1, car1SpeedData[i], car1AccelData[i], car1BrakeData[i]);
            sendDataToPubSub(i, 2, car2SpeedData[i], car2AccelData[i], car2BrakeData[i]);
            Thread.sleep(1000);
        }
    }
}
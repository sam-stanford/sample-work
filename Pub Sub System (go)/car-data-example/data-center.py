import httplib2
import json
import array

h = httplib2.Http()

# Get messages for car1
(resp_headers, content) = h.request("http://localhost:3301/pull", "GET",
                                    body="{\"endpoint\":\"test1\"}",
                                    headers={'content-type': 'application/json'})

# Convert to JSON
messages = json.loads(content)

# Acknowledge each message
for message in messages["messages"]:
    message_id = message["id"]
    (resp_headers, content) = h.request("http://localhost:3301/ack", "POST",
                                        body='{"endpoint":"test1","id":"' +
                                        message_id + '"}',
                                        headers={'content-type': 'application/json'})


# Convert data from bytes and store speed in an array
speed_array = []
for message in messages["messages"]:
    # Convert runes (byte code points) to string
    data_string = array.array('B', message["data"]).tostring()

    # Convert data_string to json
    data_json = json.loads(data_string)

    # Add speed to array
    speed_array.append(data_json["carSpeed"])

# Find & print average
car1_avg = 0
for val in speed_array:
    print("Reading speed: " + str(val))
    car1_avg += val

if (len(speed_array) == 0):
    print("No messages with speed data found")
else:
    car1_avg = car1_avg/len(speed_array)
    print("Car 1 Average Speed: " + str(car1_avg) + "\n")


# Repeat for car2
(resp_headers, content) = h.request("http://localhost:3301/pull", "GET",
                                    body="{\"endpoint\":\"test2\"}",
                                    headers={'content-type': 'application/json'})
messages = json.loads(content)
for message in messages["messages"]:
    message_id = message["id"]
    (resp_headers, content) = h.request("http://localhost:3301/ack", "POST",
                                        body='{"endpoint":"test2","id":"' +
                                        message_id + '"}',
                                        headers={'content-type': 'application/json'})
speed_array = []
for message in messages["messages"]:
    data_string = array.array('B', message["data"]).tostring()
    data_json = json.loads(data_string)
    speed_array.append(data_json["carSpeed"])

car2_avg = 0
for val in speed_array:
    print("Reading speed: " + str(val))
    car2_avg += val

if (len(speed_array) == 0):
    print("No messages with speed data found")
else:
    car2_avg = car2_avg/len(speed_array)
    print("Car 2 Average Speed: " + str(car2_avg))

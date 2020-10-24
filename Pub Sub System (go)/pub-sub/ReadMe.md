# Pub-Sub System

Please read the Report.pdf before reading this file. You can find a detailed look at each endpoint and their operations below.

---

## /publish

The publish endpoint is used to create a message. The JSON schema for POST requests is shown below.

```json
{
  "topic": "string",
  "attributes": ["string"],
  "id": "string",
  "receivedTS": "number",
  "data": ["byte"]
}
```

`topic` is the only required field and dictates the channel which the message will be added to. The channel must already exist.

`attributes` is optional. It can be used to filter messages once received by subscribers. If no attributes are given, the system will publish a message with an empty array for this field.

`id` is optional. It must be a system-compliant UUID as a string, and cannot be the same as any message already in the system. See `/generate` on how to generate a UUID. If no UUID is provided, the system will generate a UUID for the message.

`receivedTS` is optional, and represents the time at which the message is received by the system. Using Unix time (time from epoch in seconds) is advised, but not compulsory. If no time is provided, the system will set `receivedTS` to be the time at which the system publishes the message.

`data` is the payload of the message, stored as a byte array. Omitting the data field is permitted, and will result in a message with an empty array for the `data` field.

A JSON object matching the following will be returned on success.

```json
{ "success": true }
```

---

## /pull

The pull endpoint is used for subscribers to receive all messages they are subscribed to. The JSON schema for GET requests is shown below.

```json
{
  "endpoint": "string",
  "topics": ["string"]
}
```

`endpoint` is required, and dictates which subscriber to fetch messages for. Providing no value will result in an error.

`topics` is optional, and dictates which messages to fetch. Only messages with topics matching one of those given in `topics` will be returned in the response. This is useful for applications with known network delays.

A JSON object matching the following schema will be returned for an OK request.

```json
{
  "messages": [Message]
}
```

```messages``` is the array of messages returned, with the Message object matching the schema described in the ```/publish``` endpoint.

---

## /ack

The ack endpoint is used to acknowledge messages. Messages are not removed from the system until all subscribers who were subscribed to the topic at the time of publishing have acknowledged the message. The JSON schema for POST requests is shown below.

```json
{
  "id": "string",
  "endpoint": "string"
}
```

`id` is required and represents the UUID for the message to be acknowledged.

`endpoint` is required and represents the endpoint for the subscriber which is acknowledging the message.

A JSON object matching the following will be returned on success.

```json
{ "success": true }
```

---

## /topics

The topics endpoint is used to create, delete and view topics. A POST request should be used to create a topic, the JSON schema for which is shown below.

```json
{
  "topic": "string"
}
```

`topic` is required and dictates the topic for the channel being created.

A DELETE request should be used to remove a topic, and has matching schema for the POST request, where `topic` dictates the topic channel to be deleted.

The POST and DELETE requests will return a JSON object matching the following on success.

```json
{ "success": true }
```

A GET request should be used to lookup topics, and has the following schema.

```json
{
  "endpoint": "string"
}
```

`endpoint` is optional, and represents the endpoint for the subscriber for whos topic list will be returned. If no endpoint is provided, all topics will be returned.

Topics are returned in the following schema.

```json
{
  "topics": ["string"]
}
```

`topics` is a JSON array where each topic is an element in the array as a string.

---

## /subscribers

The subscribers endpoint is used to create, delete and lookup subscribers. A POST request should be used to create a subscriber, the JSON schema for which is shown below.

```json
{
  "endpoint": "string"
}
```

`endpoint` is required, and represents the endpoint for the subscriber to be created.

A DELETE request should be used to remove a subscriber, the JSON for which is identical to the POST request above. `endpoint` is still required, and dictates the endpoint of the subscriber to remove.

The POST and DELETE request methods will return a JSON object matching the following on success.

```json
{ "success": true }
```

A GET request with no body, or an empty JSON object should be sent to get a list of all subscribers. The get request will return the following.

```json
{ "endpoints": ["string"] }
```

`endpoints` will be a JSON array of all subscriber endpoints in the system.

---

## /subscriptions

The subscriptions endpoint is used to create and delete subscriptions. A POST request should be used to create a subscription, the JSON schema for which is shown below.

```json
{
  "topic": "string",
  "endpoint": "string"
}
```

`topic` is required and specifies the topic to subscriber to.

`endpoint` is required and specifies the subscriber to create the subscription for.

A DELETE request should be used to remove a subscription, the JSON schema for which is identical to the POST request above, except the subscription will be removed rather than created.

Both the POST and DELETE requests will return a JSON object matching the following on success.

```json
{ "success": true }
```

---

## /generate

The generate endpoint is used to generate a system-compliant UUID. A GET request should be used, the body of which will be ignored. The response matches the JSON schema below.

```json
{
  "id": "string"
}
```

`id` contains the generated UUID as a string.

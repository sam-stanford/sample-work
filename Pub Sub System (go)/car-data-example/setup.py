import httplib2

h = httplib2.Http(".cache")

# Create subscribers
(resp_headers, content) = h.request("http://localhost:3301/subscribers", "POST",
                                    body="{\"endpoint\":\"test1\"}", headers={'content-type': 'application/json'})
(resp_headers, content) = h.request("http://localhost:3301/subscribers", "POST",
                                    body="{\"endpoint\":\"test2\"}", headers={'content-type': 'application/json'})

# Create topics
(resp_headers, content) = h.request("http://localhost:3301/topics", "POST",
                                    body="{\"topic\":\"car1\"}", headers={'content-type': 'application/json'})
(resp_headers, content) = h.request("http://localhost:3301/topics", "POST",
                                    body="{\"topic\":\"car2\"}", headers={'content-type': 'application/json'})

# Create subscriptions
(resp_headers, content) = h.request("http://localhost:3301/subscriptions", "POST",
                                    body="{\"topic\":\"car1\",\"endpoint\":\"test1\"}", headers={'content-type': 'application/json'})
(resp_headers, content) = h.request("http://localhost:3301/subscriptions", "POST",
                                    body="{\"topic\":\"car2\",\"endpoint\":\"test2\"}", headers={'content-type': 'application/json'})
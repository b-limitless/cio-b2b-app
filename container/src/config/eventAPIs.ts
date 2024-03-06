export const BASE_URI = "http://localhost:8000/api";

// You might use enum type for the key of sse event
// Imagine you have event like this, newOrderReceivedEvent, paymentReceivedEvent, callReceivedEvent

export const SSEEventAPIs = {
  listen: `${BASE_URI}/notification/listener`,
};

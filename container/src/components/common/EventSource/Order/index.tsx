import React, { useEffect, useState } from 'react'

export default function OrderReceiveNotification() {
 const [eventData, setEventData] = useState('');
  useEffect(() => {
    const eventSource = new EventSource('http://localhost:8000/api/cart/sse');

    eventSource.onmessage = (event) => {
        // const data = JSON.parse(event.data);
        console.log(JSON.parse(event.data));
    }

    eventSource.onerror = (error) => {
        console.error('EventSource failed:', error);
        eventSource.close();
      };

      return () => {
        eventSource.close();
      }
  }, [])
  return (
    <div>
      <h1>Server Sent Events Example</h1>
      <p>{eventData}</p>
    </div>
  );
}

import React, { useEffect, useState } from 'react'

export default function useOrderReceiveNotification() {
  useEffect(() => {
    let sse:EventSource;
    const connectToSSE = () => {
      sse = new EventSource('http://localhost:8000/api/cart/sse', { withCredentials: true });

      function getRealtimeData(data: any) {
        console.log('Data', data);
        // Handle the received data
      }

      sse.onopen = () => {
        console.log(">>> Connection opened!");
      };

      sse.onmessage = (e) => {
        getRealtimeData(JSON.parse(e.data));
      };

      sse.onerror = (error) => {
        console.log('Could not connect to SSE', error);
        sse.close();

        // Retry connection after a delay (e.g., 5 seconds)
        setTimeout(connectToSSE, 5000);
      };
    };

    // Initial connection
    connectToSSE();

    // Clean up on component unmount
    return () => {
      // Close the SSE connection on component unmount
      // This will also stop reconnection attempts
      sse.close();
    };
  }, []);
}
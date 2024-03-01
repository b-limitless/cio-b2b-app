/**
 * From the server there will be different kind of event will be pushed 
 * data: {
 * type: eventTypeEnum,
 * data:any
 * }
*/
import { useEffect } from 'react';
import { SSEEventAPIs } from '../../../../config/eventAPIs';

export default function useOrderReceiveNotification() {
  useEffect(() => {
    let sse:EventSource;
    const connectToSSE = () => {
      sse = new EventSource(SSEEventAPIs.orderReceived, { withCredentials: true });

      function getRealtimeData(data: any) {
        console.log('Data', data);
      }

      sse.onopen = () => {
        console.log("Connected to the server sent event!");
      };

      sse.onmessage = (e) => {
        console.log('e.type', e)
        getRealtimeData(JSON.parse(e.data));
      };

      sse.onerror = (error) => {
        console.log('Could not connect to SSE', error);
        sse.close();

        // Retry connection after a delay (e.g., 2 seconds)
        setTimeout(connectToSSE, 2000);
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
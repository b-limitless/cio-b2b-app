/**
*/
import { useEffect } from 'react';
import { SSEEventAPIs } from '../../../../config/eventAPIs';
import { INotification, addNotification } from '../../../../../reducers/notficiationSlice';
import { EEvents } from '../../../../types&Enums/events';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../store';

export default function useOrderReceiveNotification() {
  const {auth} = useSelector((state:RootState) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    let sse: EventSource;
    const connectToSSE = () => {
      sse = new EventSource(SSEEventAPIs.listen, { withCredentials: true });

      function getRealtimeData(data: INotification) {
        dispatch(addNotification(data));
        if (data.type === EEvents.newOrderReceived) {
          // Lets dispatch the message

          console.log('Data for the order', data);
        }
        if (data.type === EEvents.newCallReceived) {
          console.log('Data for call', data);
        }

      }

      sse.onopen = () => {
        console.log("Connected to the server sent event!");
      };

      sse.onmessage = (e) => {
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
    if(!auth) return;
    
    connectToSSE();

    // Clean up on component unmount
    return () => {
      // Close the SSE connection on component unmount
      // This will also stop reconnection attempts
      sse.close();
    };
  }, [auth]);
}
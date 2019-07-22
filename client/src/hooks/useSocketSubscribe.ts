import { useEffect } from 'react';

import { SocketCallback } from '../../../types';

/**  Subscribe a listener to a socket event
 * @param socket - The socket on which to place the listener
 * @param socketEvent - The event to listen for
 * @param listener - The function to subscribe to the event
 */
export default function(
  socket: SocketIOClient.Socket,
  socketEvents: string[],
  listener: Function
) {
  socketEvents.forEach(socketEvent => {
    useEffect(() => {
      const cb: SocketCallback = (firstArg, ...rest: any[]) => {
        // Pass the socket event name and contents to the listener
        listener({ socketEvent, ...firstArg, rest });
      };

      // TODO: Frontend and backend should agree on a type contract for this callback. It could involve XState.Action

      socket.on(socketEvent, cb);

      // Function to unsubscribe this listener
      return () => {
        socket.off(socketEvent, cb);
      };
    }, [socket, socketEvents, listener]);
  });
}

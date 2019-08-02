import { useEffect, useCallback } from 'react';

import { SocketCallback } from 'kms-types';

/**  Subscribe a listener to a socket event
 * @param socket - The socket on which to place the listener
 * @param socketEvent - The event to listen for
 * @param listener - The function to subscribe to the event
 * @returns null
 */
export default function(
  io: SocketIOClientStatic,
  room: string,
  listener: SocketCallback
) {
  // Memoize
  const setupEventSubscription = useCallback(() => {
    // Connect to namespace
    const socket = io.connect(room);

    // Subscribe
    socket.on('message', listener);

    // Function to unsubscribe this listener
    return () => {
      socket.off('message', listener);
    };
  }, [listener, io]);

  // Run on initial render and if any of the arguments to the hook change
  useEffect(
    // Returns unsubscriber
    () => setupEventSubscription(),
    [setupEventSubscription]
  );

  return; // null
}

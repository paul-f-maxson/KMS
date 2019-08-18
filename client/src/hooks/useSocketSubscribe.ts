import { useEffect, useCallback } from 'react';

import SocketIOClient from 'socket.io-client';

import { SocketCallback } from 'kms-types';

/**  Subscribe a listener to a socket event
 * @param socketEvent - The room to listen to
 * @param listener - The function to subscribe to the event
 * @returns null
 */
export default function(room: string, listener: SocketCallback) {
  // Memoize
  const setupEventSubscription = useCallback(() => {
    // Connect to namespace
    const socket = SocketIOClient.connect(room);

    // Subscribe
    socket.on('message', listener);

    // Function to unsubscribe this listener
    return () => {
      socket.off('message', listener);
    };
  }, [listener, room]);

  // Run on initial render and if any of the arguments to the hook change
  useEffect(
    // Returns unsubscriber
    () => setupEventSubscription(),
    [setupEventSubscription]
  );

  return; // null
}

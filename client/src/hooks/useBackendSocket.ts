import { useReducer, useCallback } from 'react';

import useSocketSubscribe from './useSocketSubscribe';

/** Provides a local state value and function to send events to the backend.
 * @description The backend of this application comprises a server, a state machine, and a socket. The server forwards events sent to it to the machine. The machine emits messages over the various socket namespaces as 'message' events. These messages implement the action interface, and can be used to sync with the machine's state.
 *
 * This Hook encapsulates all of the logic required to subscribe to a 'message' event emitted over a particular socket namespace and maintain an internal state based on the actions transmitted.
 * @param socketEvent - The event to listen for on the socket
 * @param reducer - A function to generate a new state from old state based on the event received from the backend machine
 * @param defaultLocalState
 * @returns a tuple of a local state value and function to dispatch events against the backend machine
 */
export default function<IState, IEvent>(
  room: string,
  reducer: React.Reducer<IState, IEvent>,
  defaultLocalState: IState
) {
  const [localState, localDispatch] = useReducer(reducer, defaultLocalState);

  // TODO: This should be more securely typed. There should be a type contract for this listener and the server machine should emit events that conform to that signature
  // Currently the signature is (...args: any[]) => void
  // It should be a generic

  // An adapter to configure the reducer dispatch function into the socket subscription callback
  const listener = useCallback(
    (event: IEvent) => {
      localDispatch(event);
    },
    [localDispatch]
  );

  useSocketSubscribe(room, listener);

  /**
   *@summary Send events to the core app state store
   */
  const backendDispatch = () => {};

  return [localState, backendDispatch] as [
    IState,
    Function /* COMBAK when backendDispatch is done and update this type */
  ];
}

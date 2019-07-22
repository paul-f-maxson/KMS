import { useReducer } from 'react';

import useSocketSubscribe from './useSocketSubscribe';
import { Action } from 'kms-types';

/** Provides a local state value and function to send events to the backend.
 * @description The backend of this application comprises a server, a state machine, and a socket. The server forwards events sent to it to the machine. The machine emits messages over the various socket namespaces as events. These messages implement the action interface, and can be used to sync with the machine's state.
 * @description This Hook encapsulates all of the logic required to subscribe to a particular event emitted over a particular socket namespace and maintain an internal state based on the actions transmitted.
 * @param socket - The socket namespace to listen to
 * @param socketEvents - The events to listen for on the socket
 * @param reducer - A function to generate a new state from old state based on the action received from the backend machine
 * @param defaultLocalState
 * @returns a local state value and function to dispatch events against the backend machine
 */
export default function<
  // COMBAK: putting any here can't be right
  IState /* extends React.ReducerState<any> */,
  IAction extends Action
>(
  socket: SocketIOClient.Socket,
  socketEvents: string[],
  reducer: React.Reducer<IState, IAction>,
  defaultLocalState: IState
) {
  const [localState, localDispatch] = useReducer(reducer, defaultLocalState);

  useSocketSubscribe(socket, socketEvents, localDispatch);

  const backendDispatch = () => {};

  return [localState, backendDispatch] as [
    IState,
    Function /* COMBAK when backendDispatch is done and update this type to React.Dispatch */
  ];
}

import React, { useContext } from 'react';

import { SocketRootContext } from '.';
import useBackendSocket from './hooks/useBackendSocket';
import { Action } from './types';

export interface LocalState {
  ordersCount: number;
}

// Implementing the state spread pattern now for future safety, even though it is irrelevant now
const reducer = ({ ordersCount, ...state }: LocalState) => ({
  ...state,
  ordersCount: ordersCount + 1,
});

export default () => {
  const socket = useContext(SocketRootContext);
  const [{ ordersCount }, dispatch] = useBackendSocket<LocalState, Action>(
    socket,
    ['newOrder'],
    reducer,
    { ordersCount: 0 }
  );
  return (
    <>
      <h1>Tickets: {ordersCount}</h1>
    </>
  );
};

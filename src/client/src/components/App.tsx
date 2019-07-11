import React, { useContext } from 'react';

import { SocketRootContext } from '..';
import useBackendSocket from '../hooks/useBackendSocket';
import { Action, Order } from '../../../types';
import Ticket from './Ticket';

const reducerConfig: {
  [actionType: string]: React.Reducer<LocalState, Action>;
} = {
  ADD: ({ orders, ...restOfState }, action) => ({
    ...restOfState,
    orders: [...orders, action.order],
  }),
};

// Implementing the state spread pattern now for future safety, even though it is irrelevant now
const reducer: React.Reducer<LocalState, Action> = (prevState, action) => {
  const fn = reducerConfig[action.type];
  return fn === undefined ? prevState : fn(prevState, action);
};

export interface LocalState {
  orders: Array<Order>;
}

export default () => {
  const socket = useContext(SocketRootContext);
  const [{ orders }, dispatch] = useBackendSocket<LocalState, Action>(
    socket,
    ['newOrder'],
    reducer,
    { orders: [] }
  );
  return (
    <>
      <h1>Tickets</h1>
      {orders.map(order => (
        <Ticket {...order} />
      ))}
    </>
  );
};

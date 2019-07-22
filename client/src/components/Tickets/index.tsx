import React, { useContext } from 'react';

import { SocketRootContext } from '../..';

import useBackendSocket from '../../hooks/useBackendSocket';

import { Action, Order } from '../../../../types';

import Presentational from './Presentational';
import reducer from './reducer';

export type LocalState = Array<Order>;

const Tickets: React.FC = () => {
  const socket = useContext(SocketRootContext);
  const [orders, dispatch] = useBackendSocket<LocalState, Action>(
    socket,
    ['newOrder'],
    reducer,
    []
  );
  return <Presentational orders={orders} />;
};

export default Tickets;

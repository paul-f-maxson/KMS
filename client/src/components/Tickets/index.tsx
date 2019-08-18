import React from 'react';

import useBackendSocket from '../../hooks/useBackendSocket';

import { Action, Order } from 'kms-types';

import Presentational from './Presentational';

import reducer from './reducer';

export type LocalState = Array<Order>;

const Tickets: React.FC = () => {
  const [orders /* , dispatch */] = useBackendSocket<LocalState, Action>(
    '/machine',
    reducer,
    []
  );

  return <Presentational orders={orders} />;
};

export default Tickets;

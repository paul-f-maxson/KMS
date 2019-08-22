import React from 'react';

import useBackendSocket from '../../hooks/useBackendSocket';

import { Action, Order } from 'kms-types';

import Presentational from './Presentational';

import reducer from './reducer';

import mockOrders from '../../mockOrders';

export type LocalState = Array<Order>;

const Expeditor: React.FC = () => {
  const [orders /* , dispatch */] = useBackendSocket<LocalState, Action>(
    '/machine',
    reducer,
    []
  );

  return <Presentational orders={mockOrders} />;
};

export default Expeditor;

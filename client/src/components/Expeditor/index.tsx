import React from 'react';

import useBackendSocket from '../../hooks/useBackendState';

import { Order } from 'kms-types';

import Presentational from './Presentational';

import reducer from './reducer';

import mockOrders from '../../mockOrders';

export type LocalState = Array<Order>;

const defaultLocalState: LocalState = [];

const Expeditor: React.FC = () => {
  const orders = useBackendSocket('/machine', reducer, defaultLocalState);

  return <Presentational orders={mockOrders} />;
};

export default Expeditor;

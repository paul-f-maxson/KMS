import React, { useReducer } from 'react';
import Grid from '@material-ui/core/Grid';
import { Order } from 'kms-types';

import Ticket from '../Ticket';
import TicketBuilder from './TicketBuilder';

import reducer from './reducer';

import makeId from '../../utils/makeId';

export type LocalState = Order;

const defaultOrder = {
  id: makeId(),
  delay: 0,
  table: 0,
  meals: [],
};

const PointOfSale = () => {
  const [order, orderDispatch] = useReducer(reducer, defaultOrder);

  return (
    <Grid container spacing={2}>
      <Grid item>
        <Ticket {...order} />
      </Grid>
      <Grid item>
        <TicketBuilder orderDispatch={orderDispatch} order={order} />
      </Grid>
    </Grid>
  );
};

export default PointOfSale;

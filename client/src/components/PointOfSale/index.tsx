import React, { useReducer } from 'react';
import Grid from '@material-ui/core/Grid';
import { Order } from 'kms-types';

import Ticket from '../Ticket';
import TicketBuilder from './TicketBuilder';

import orderReducer, { defaultState as defaultOrder } from './orderReducer';

import mealReducer, { defaultState as defaultMeal } from './currentMealReducer';

export type LocalState = Order;

const PointOfSale = () => {
  const [order, orderDispatch] = useReducer(orderReducer, defaultOrder);

  const [currentMeal, currentMealDispatch] = useReducer(
    mealReducer,
    defaultMeal
  );

  const ticketBuilderProps = {
    order,
    orderDispatch,
    currentMeal,
    currentMealDispatch,
  };

  const orderTemp = { ...order, meals: [...order.meals, currentMeal] };

  return (
    <Grid container spacing={2}>
      <Grid item>
        <Ticket {...orderTemp} />
      </Grid>
      <Grid item>
        <TicketBuilder {...ticketBuilderProps} />
      </Grid>
    </Grid>
  );
};

export default PointOfSale;

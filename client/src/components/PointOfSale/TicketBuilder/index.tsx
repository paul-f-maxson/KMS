import React, {
  ChangeEventHandler,
  MouseEventHandler,
  useReducer,
} from 'react';

import { Order, Meal } from 'kms-types';

import { LocalAction as OrderAction } from '../reducer';

import reducer, { defaultState as defaultMeal } from './reducer';

import Presentational from './Presentational';

export type LocalState = Meal;

const TicketBuilderForm: React.FC<{
  order: Order;
  orderDispatch: React.Dispatch<OrderAction>;
}> = ({ order, orderDispatch }) => {
  const backendDispatch = (a: any) => {};

  const [currentMeal, currentMealDispatch] = useReducer(reducer, defaultMeal);

  const handleTableChange: ChangeEventHandler<HTMLInputElement> = ({
    target: { value },
  }) => orderDispatch({ type: 'CHANGE_TABLE', table: value });

  const handleNewMealClick: MouseEventHandler<HTMLButtonElement> = () => {
    orderDispatch({ type: 'ADD_MEAL', ...currentMeal });

    currentMealDispatch({ type: 'CLEAR' });
  };

  const handleSeatNumberChange: ChangeEventHandler<HTMLInputElement> = ({
    target: { value },
  }) => {
    currentMealDispatch({ type: 'CHANGE_SEAT', seat: value });
  };

  const handleOrderSubmitClick: MouseEventHandler<HTMLButtonElement> = () => {
    backendDispatch({});
    orderDispatch({ type: 'CLEAR' });
  };

  return (
    <Presentational
      table={order.table}
      currentSeatNumber={currentMeal.seat}
      handleSeatNumberChange={handleSeatNumberChange}
      handleTableChange={handleTableChange}
      handleNewMealClick={handleNewMealClick}
      handleOrderSubmitClick={handleOrderSubmitClick}
    />
  );
};

export default TicketBuilderForm;

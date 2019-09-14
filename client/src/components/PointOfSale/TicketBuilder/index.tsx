import React, {
  ChangeEventHandler,
  MouseEventHandler,
  useCallback,
} from 'react';

import { Order, Meal } from 'kms-types';

import { LocalAction as OrderAction } from '../orderReducer';

import { LocalAction as MealAction } from '../currentMealReducer';

import Presentational from './Presentational';
import useBackendDispatch from '../../../hooks/useBackendDispatch';

export type LocalState = Meal;

const TicketBuilderForm: React.FC<{
  order: Order;
  orderDispatch: React.Dispatch<OrderAction>;
  currentMeal: Meal;
  currentMealDispatch: React.Dispatch<MealAction>;
}> = ({ order, orderDispatch, currentMeal, currentMealDispatch }) => {
  const backendDispatch = useBackendDispatch();

  const handleTableChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    ({ target: { value } }) => {
      orderDispatch({ type: 'CHANGE_TABLE', table: value });
    },
    [orderDispatch]
  );

  // OPTIMIZE: Remove currentMeal dependency
  const handleNewMealClick = useCallback<
    MouseEventHandler<HTMLButtonElement>
  >(() => {
    orderDispatch({ type: 'ADD_MEAL', newMeal: currentMeal });

    currentMealDispatch({ type: 'CLEAR' });
  }, [currentMeal, orderDispatch, currentMealDispatch]);

  const handleMealChangeClick = useCallback<
    MouseEventHandler<HTMLButtonElement>
  >(
    event => {
      currentMealDispatch({
        type: 'CHANGE_MEAL',
        dish: event.currentTarget.value,
      });
    },
    [currentMealDispatch]
  );

  const handleSeatNumberChange = useCallback<
    ChangeEventHandler<HTMLInputElement>
  >(
    ({ target: { value } }) => {
      currentMealDispatch({ type: 'CHANGE_SEAT', seat: value });
    },
    [currentMealDispatch]
  );

  const handleOrderSubmitClick = useCallback<
    MouseEventHandler<HTMLButtonElement>
  >(() => {
    backendDispatch({});
    orderDispatch({ type: 'CLEAR' });
    currentMealDispatch({ type: 'CLEAR' });
  }, [backendDispatch, orderDispatch, currentMealDispatch]);

  const presentationalProps = {
    table: order.table,
    currentSeatNumber: currentMeal.seat,
    handleSeatNumberChange,
    handleTableChange,
    handleMealChangeClick,
    handleNewMealClick,
    handleOrderSubmitClick,
  };

  return <Presentational {...presentationalProps} />;
};

export default TicketBuilderForm;

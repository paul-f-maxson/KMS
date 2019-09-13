import React, {
  ChangeEventHandler,
  MouseEventHandler,
  useReducer,
  useCallback,
} from 'react';

import { Order, Meal } from 'kms-types';

import { LocalAction as OrderAction } from '../reducer';

import reducer, { defaultState as defaultMeal } from './reducer';

import Presentational from './Presentational';
import useBackendDispatch from '../../../hooks/useBackendDispatch';

export type LocalState = Meal;

const TicketBuilderForm: React.FC<{
  order: Order;
  orderDispatch: React.Dispatch<OrderAction>;
}> = ({ order, orderDispatch }) => {
  const backendDispatch = useBackendDispatch();

  const [currentMeal, currentMealDispatch] = useReducer(reducer, defaultMeal);

  const handleTableChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    ({ target: { value } }) => {
      orderDispatch({ type: 'CHANGE_TABLE', table: value });
    },
    [orderDispatch]
  );

  const handleNewMealClick = useCallback<
    MouseEventHandler<HTMLButtonElement>
  >(() => {
    orderDispatch({ type: 'ADD_MEAL', ...currentMeal });

    currentMealDispatch({ type: 'CLEAR' });
  }, [orderDispatch, currentMealDispatch]);

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
  }, [backendDispatch, orderDispatch]);

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

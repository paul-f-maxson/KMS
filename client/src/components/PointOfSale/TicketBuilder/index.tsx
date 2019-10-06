import React, {
  ChangeEventHandler,
  MouseEventHandler,
  useCallback,
} from 'react';

import { Order, Meal } from 'kms-types';

import * as OrderActions from '../orderActions';

import * as CurrentMealActions from '../currentMealActions';

import Presentational from './Presentational';
import useBackendDispatch from '../../../hooks/useBackendDispatch';

const TicketBuilderForm: React.FC<{
  order: Order;
  orderDispatch: React.Dispatch<OrderActions.LocalActionType>;
  currentMeal: Meal;
  currentMealDispatch: React.Dispatch<CurrentMealActions.LocalActionType>;
}> = ({ order, orderDispatch, currentMeal, currentMealDispatch }) => {
  const backendDispatch = useBackendDispatch();

  const handleTableChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    ({ target: { value } }) => {
      orderDispatch(OrderActions.changeTable(value));
    },
    [orderDispatch]
  );

  const handleNewMealClick = useCallback<
    MouseEventHandler<HTMLButtonElement>
  >(() => {
    orderDispatch(OrderActions.addMeal(currentMeal));

    currentMealDispatch(CurrentMealActions.clear());
  }, [currentMeal, orderDispatch, currentMealDispatch]);

  const handleMealChangeClick = useCallback<
    MouseEventHandler<HTMLButtonElement>
  >(
    ({ currentTarget: { value } }) => {
      currentMealDispatch(CurrentMealActions.changeMeal(value));
    },
    [currentMealDispatch]
  );

  const handleSeatNumberChange = useCallback<
    ChangeEventHandler<HTMLInputElement>
  >(
    ({ target: { value } }) => {
      currentMealDispatch(CurrentMealActions.changeSeat(value));
    },
    [currentMealDispatch]
  );

  const handleOrderSubmitClick = useCallback<
    MouseEventHandler<HTMLButtonElement>
  >(() => {
    backendDispatch({ type: 'ADD', order });
    orderDispatch(OrderActions.clear());
    currentMealDispatch(OrderActions.clear());
  }, [order, backendDispatch, orderDispatch, currentMealDispatch]);

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

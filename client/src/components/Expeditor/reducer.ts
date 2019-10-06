import { LocalState } from '.';
import { Action } from 'kms-types';

export type LocalAction = Action<'ADD' | 'BUMP'>;

const reducer: React.Reducer<LocalState, LocalAction> = (
  prevOrders,
  action
) => {
  switch (action.type) {
    case 'ADD':
      if (action.order) {
        return [...prevOrders, action.order];
      } else throw new TypeError();

    default:
      return prevOrders;
  }
};

export default reducer;

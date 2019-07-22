import { LocalState } from '.';
import { Action } from '../../../../types';

const reducerConfig: {
  [actionType: string]: React.Reducer<LocalState, Action>;
} = {
  ADD: (orders, action) => [...orders, action.order],
};

const reducer: React.Reducer<LocalState, Action> = (prevState, action) => {
  const fn = reducerConfig[action.type];
  return fn === undefined ? prevState : fn(prevState, action);
};

export default reducer;

import { LocalState } from '.';
import { Action } from 'kms-types';

const on: {
  [actionType: string]: React.Reducer<LocalState, Action>;
} = {
  ADD: (orders, action) => [...orders, action.order],
};

const reducer: React.Reducer<LocalState, Action> = (prevState, action) => {
  /* console.log(
    `reducer:\n\tprevState: ${JSON.stringify(
      prevState
    )}\n\taction: ${JSON.stringify(action)}`
  ); */
  const fn = on[action.type];
  return fn === undefined ? prevState : fn(prevState, action);
};

export default reducer;

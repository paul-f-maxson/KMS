import { LocalState } from '.';
import { Action } from 'kms-types';

import makeReducer from '../../utils/makeReducer';

export type LocalAction = Action<'ADD'>;

const on: {
  [actionType: string]: React.Reducer<LocalState, LocalAction>;
} = {
  ADD: (orders, action) => [...orders, action.order],
};

export default makeReducer(on);

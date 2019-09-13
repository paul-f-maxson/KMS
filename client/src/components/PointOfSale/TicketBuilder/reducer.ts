import { LocalState } from '.';
import { Action } from 'kms-types';

import makeReducer from '../../../utils/makeReducer';

import makeId from '../../../utils/makeId';

export type LocalAction = Action<'CHANGE_MEAL' | 'CHANGE_SEAT' | 'CLEAR'>;

export const defaultState = {
  id: makeId(),
  seat: 0,
  dish: '',
};

const on: {
  [actionType: string]: React.Reducer<LocalState, LocalAction>;
} = {
  CHANGE_MEAL: (prevState, action) => ({ ...prevState, dish: action.dish }),
};

export default makeReducer(on);

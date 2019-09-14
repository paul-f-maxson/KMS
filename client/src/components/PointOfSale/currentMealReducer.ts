import { LocalState } from './TicketBuilder';
import { Action } from 'kms-types';

import makeReducer from '../../utils/makeReducer';

import makeId from '../../utils/makeId';

export type LocalAction = Action<'CHANGE_MEAL' | 'CHANGE_SEAT' | 'CLEAR'>;

const makeDefaultState = () => ({
  id: makeId(),
  seat: 0,
  dish: '',
});

export const defaultState = makeDefaultState();

const on: {
  [actionType: string]: React.Reducer<LocalState, LocalAction>;
} = {
  CHANGE_MEAL: (prevState, action) => ({ ...prevState, dish: action.dish }),
  CHANGE_SEAT: (prevState, action) => ({ ...prevState, seat: action.seat }),
  CLEAR: () => makeDefaultState(),
};

export default makeReducer(on);

import { LocalState } from '.';
import { Action } from 'kms-types';

import makeReducer from '../../utils/makeReducer';

import makeId from '../../utils/makeId';

export type LocalAction = Action<'ADD_MEAL' | 'CHANGE_TABLE' | 'CLEAR'>;

const on: {
  [actionType: string]: React.Reducer<LocalState, LocalAction>;
} = {
  ADD_MEAL: (prevState, { seat, dish }) => ({
    ...prevState,
    meals: [...prevState.meals, { id: makeId(), seat, dish }],
  }),
};

export default makeReducer(on);

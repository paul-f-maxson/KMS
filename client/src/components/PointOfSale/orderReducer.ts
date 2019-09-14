import { LocalState } from '.';
import { Action } from 'kms-types';

import makeReducer from '../../utils/makeReducer';

import makeId from '../../utils/makeId';

export type LocalAction = Action<'ADD_MEAL' | 'CHANGE_TABLE' | 'CLEAR'>;

const makeDefaultState = () => ({
  id: makeId(),
  delay: 0,
  table: 0,
  meals: [],
});

export const defaultState = makeDefaultState();

const on: {
  [actionType: string]: React.Reducer<LocalState, LocalAction>;
} = {
  ADD_MEAL: (prevState, { newMeal }) => ({
    ...prevState,
    meals: [...prevState.meals, newMeal],
  }),
  CHANGE_TABLE: (prevState, { table }) => ({
    ...prevState,
    table,
  }),
  CLEAR: () => makeDefaultState(),
};

export default makeReducer(on);

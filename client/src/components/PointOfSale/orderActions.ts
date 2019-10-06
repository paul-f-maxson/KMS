import { Meal } from 'kms-types';

// These typings are equivalent to a const type assertion
// TODO: refactor to const assertion when feature is available
export const addMeal: (
  newMeal: Meal
) => {
  readonly type: 'ADD_MEAL';
  readonly newMeal: Meal;
} = newMeal => ({
  type: 'ADD_MEAL',
  newMeal,
});

export const changeTable: (
  table: string
) => {
  readonly type: 'CHANGE_TABLE';
  readonly table: string;
} = table => ({
  type: 'CHANGE_TABLE',
  table,
});

export const clear: () => {
  readonly type: 'CLEAR';
} = () => ({
  type: 'CLEAR',
});

export type LocalActionType =
  | ReturnType<typeof addMeal>
  | ReturnType<typeof changeTable>
  | ReturnType<typeof clear>;

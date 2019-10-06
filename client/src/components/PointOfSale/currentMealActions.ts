// These typings are equivalent to a const type assertion
// TODO: refactor to const assertion when feature is available
export const changeMeal: (
  dish: string
) => {
  readonly type: 'CHANGE_MEAL';
  readonly dish: string;
} = dish => ({
  type: 'CHANGE_MEAL',
  dish,
});

export const changeSeat: (
  seat: string
) => {
  readonly type: 'CHANGE_SEAT';
  readonly seat: string;
} = seat => ({
  type: 'CHANGE_SEAT',
  seat,
});

export const clear: () => {
  readonly type: 'CLEAR';
} = () => ({
  type: 'CLEAR',
});

export type LocalActionType =
  | ReturnType<typeof changeMeal>
  | ReturnType<typeof changeSeat>
  | ReturnType<typeof clear>;

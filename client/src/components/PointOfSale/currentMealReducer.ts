import { LocalActionType } from './currentMealActions';

const makeDefaultState = () => ({
  id: '',
  seat: '',
  dish: '',
});

export type LocalState = ReturnType<typeof makeDefaultState>;

export const defaultState = makeDefaultState();

const reducer: React.Reducer<LocalState, LocalActionType> = (
  prevState,
  action
) => {
  switch (action.type) {
    case 'CHANGE_MEAL':
      if (action.dish || action.dish === '') {
        return { ...prevState, dish: action.dish };
      } else throw new TypeError();

    case 'CHANGE_SEAT': {
      if (action.seat || action.seat === '') {
        return { ...prevState, seat: action.seat };
      } else throw new TypeError();
    }

    case 'CLEAR':
      return makeDefaultState();

    default:
      return prevState;
  }
};

export default reducer;

import { Meal } from 'kms-types';

import { LocalActionType } from './orderActions';

const sequentialIds = (function*() {
  let n = 0;
  while (true) {
    yield (n++).toString();
  }
})();

const makeDefaultState = () => ({
  id: sequentialIds.next().value,
  delay: 0,
  table: '0',
  meals: new Array<Meal>(),
});

type LocalState = ReturnType<typeof makeDefaultState>;

export const defaultState = makeDefaultState();

const reducer: React.Reducer<LocalState, LocalActionType> = (
  prevState,
  action
) => {
  switch (action.type) {
    case 'ADD_MEAL':
      if (action.newMeal) {
        return {
          ...prevState,
          meals: [
            ...prevState.meals,
            { ...action.newMeal, id: sequentialIds.next().value },
          ],
        };
        // this throw should be impossible as long as TS does its job, but incuding just in case
      } else throw new TypeError();

    case 'CHANGE_TABLE':
      if (action.table || action.table === '') {
        return {
          ...prevState,
          table: action.table,
        };
        // this throw should be impossible as long as TS does its job, but incuding just in case
      } else throw new TypeError();

    case 'CLEAR':
      return makeDefaultState();

    default:
      return prevState;
  }
};

export default reducer;

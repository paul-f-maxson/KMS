import reducer from './reducer';
import { Order, OrdersEvent, AddOrderEvent } from 'kms-types';
import { LocalState } from '.';
import { testHook } from '../../test-utils';
import { useReducer, useEffect } from 'react';
import { act } from 'react-dom/test-utils';

const testOrder: Order = {
  id: '1',
  table: 100,
  delay: 1000,
  meals: [{ seat: 1, id: '1', dish: 'apples' }],
};

describe('reducer', () => {
  test('reducer is pure', () => {
    const action: AddOrderEvent = { type: 'ADD', order: testOrder };

    const prevState: LocalState = [];
    const newState = reducer(prevState, action);
    expect(newState).not.toBe(prevState);
  });

  test('reducer responds correctly to ADD action with an empty prevState', () => {
    const action: AddOrderEvent = { type: 'ADD', order: testOrder };

    const prevState: LocalState = [];
    const newState = reducer(prevState, action);
    expect(newState).toEqual([testOrder]);
  });

  test('reducer responds correctly to ADD action with existing orders', () => {
    const oldOrder = testOrder;

    const newOrder = { ...testOrder, id: '2' };

    const action: AddOrderEvent = { type: 'ADD', order: newOrder };

    const prevState: LocalState = [oldOrder];
    const newState = reducer(prevState, action);
    expect(newState).toEqual([oldOrder, newOrder]);
  });

  // disabled because it essentially tests a copy of a piece of component implementation detail. Prefer testing the component itself as a unit.
  xtest('reducer functions in useReducer', () => {
    const action: AddOrderEvent = { type: 'ADD', order: testOrder };

    let outerScopeStateCopy;

    const cleanupTest = testHook(() => {
      const [state, dispatch] = useReducer(reducer, []);

      outerScopeStateCopy = state;

      useEffect(() => {
        dispatch(action);
      }, []);
    });

    expect(outerScopeStateCopy).toEqual([action.order]);

    cleanupTest();
  });
});

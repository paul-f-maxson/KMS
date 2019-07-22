import reducer from './reducer';
import { Order, OrdersEvent, AddOrderEvent } from 'kms-types';
import { LocalState } from '.';

test('reducer is pure', () => {
  const order: Order = {
    id: '1',
    table: 100,
    delay: 1000,
    meals: [{ seat: 1, id: '1', dish: 'apples' }],
  };

  const action: AddOrderEvent = { type: 'ADD', order };

  const prevState: LocalState = [];
  const newState = reducer(prevState, action);
  expect(newState).not.toBe(prevState);
});

test('reducer responds correctly to ADD action with an empty prevState', () => {
  const order: Order = {
    id: '1',
    table: 100,
    delay: 1000,
    meals: [{ seat: 1, id: '1', dish: 'apples' }],
  };

  const action: AddOrderEvent = { type: 'ADD', order };

  const prevState: LocalState = [];
  const newState = reducer(prevState, action);
  expect(newState).toEqual([order]);
});

test('reducer responds correctly to ADD action with existing orders', () => {
  const oldOrder: Order = {
    id: '1',
    table: 100,
    delay: 1000,
    meals: [{ seat: 1, id: '1', dish: 'apples' }],
  };

  const newOrder: Order = {
    id: '1',
    table: 100,
    delay: 1000,
    meals: [{ seat: 1, id: '1', dish: 'apples' }],
  };

  const action: AddOrderEvent = { type: 'ADD', order: newOrder };

  const prevState: LocalState = [oldOrder];
  const newState = reducer(prevState, action);
  expect(newState).toEqual([oldOrder, newOrder]);
});

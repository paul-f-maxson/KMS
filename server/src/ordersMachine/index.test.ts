const { interpret } = require('xstate');

import makeOrdersMachine from '.';
import { Order, OrdersEvent } from '../types';

const makeDummyIO = () => {
  const mockEmit = jest.fn(() => {}).mockName('mockEmit');
  const mockToEmit = jest.fn(() => {}).mockName('mockToEmit');
  const mockTo = jest
    .fn(() => ({
      emit: mockToEmit,
    }))
    .mockName('mockTo');

  return { io: { to: mockTo, emit: mockEmit }, mockEmit, mockTo, mockToEmit };
};

// NOTE: Favor testing socket emmissions over directly testing the machine

test('add order emits update event', () => {
  const { io, mockEmit } = makeDummyIO();
  const machine = makeOrdersMachine((io as unknown) as SocketIO.Socket);
  const order: Order = {
    id: '1',
    table: 100,
    delay: 1000,
    meals: [{ seat: 1, id: '1', dish: 'apples' }],
  };
  const event: OrdersEvent = { type: 'ADD', order };

  interpret(machine)
    .start()
    .send(event);

  expect(mockEmit).toHaveBeenCalledWith('newOrder', event);
});

test('add order creates correctly namespaced io', () => {
  const { io, mockTo } = makeDummyIO();
  const machine = makeOrdersMachine((io as unknown) as SocketIO.Socket);
  const order = {
    id: '1',
    delay: 1000,
    table: 100,
    meals: [{ seat: 1, id: '1', dish: 'apples' }],
  };
  const event: OrdersEvent = { type: 'ADD', order };

  interpret(machine)
    .start()
    .send(event);

  expect(mockTo).toHaveBeenCalledWith(`order:${event.order.id}`);
});

test('start order emits order update event', () => {
  const { io, mockToEmit } = makeDummyIO();
  const machine = makeOrdersMachine((io as unknown) as SocketIO.Socket);
  const order = {
    id: '1',
    delay: 1000,
    table: 100,
    meals: [{ seat: 1, id: '1', dish: 'apples' }],
  };
  const addEvent: OrdersEvent = { type: 'ADD', order };

  const service = interpret(machine).start();

  service.send(addEvent);

  service.send({ type: 'FIRE_ORDER', id: '1' } as OrdersEvent);

  expect(mockToEmit).toHaveBeenCalledWith('orderUpdate', { state: 'ready' });
});

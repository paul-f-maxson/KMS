const { interpret } = require('xstate');

import makeOrdersMachine from '.';
import { Order, OrdersEvent } from 'kms-types';

const makeMockIO = () => {
  const mockSend = jest.fn(() => {}).mockName('mockSend');
  const mockToSend = jest.fn(() => {}).mockName('mockToSend');
  const mockTo = jest
    .fn(() => ({
      send: mockToSend,
    }))
    .mockName('mockTo');

  return {
    io: { to: mockTo, send: mockSend },
    mockSend,
    mockTo,
    mockToSend,
  };
};

// NOTE: Favor testing socket emmissions over directly testing the machine

describe('ordersMachine', () => {
  test('add order emits update event', () => {
    const { io, mockSend } = makeMockIO();
    const machine = makeOrdersMachine((io as unknown) as SocketIO.Namespace);
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

    expect(mockSend).toHaveBeenNthCalledWith(1, event);
  });

  test('add order creates correctly namespaced io', () => {
    const { io, mockTo } = makeMockIO();
    const machine = makeOrdersMachine((io as unknown) as SocketIO.Namespace);
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
});

describe('orderMachine', () => {
  test('emits correct order update events', () => {
    const { io, mockToSend } = makeMockIO();
    const machine = makeOrdersMachine((io as unknown) as SocketIO.Namespace);
    const order = {
      id: '1',
      delay: 1000,
      table: 100,
      meals: [{ seat: 1, id: '1', dish: 'apples' }],
    };
    const addEvent: OrdersEvent = { type: 'ADD', order };

    const service = interpret(machine).start();

    service.send(addEvent);

    // FIRE
    const fireEvent = { type: 'FIRE_ORDER', id: '1' };
    service.send(fireEvent);

    expect(mockToSend).toHaveBeenNthCalledWith(1, fireEvent);

    // START
    const startEvent = { type: 'START_ORDER', id: '1' };
    service.send(startEvent);

    expect(mockToSend).toHaveBeenNthCalledWith(2, startEvent);

    // BUMP
    const bumpEvent = { type: 'BUMP_ORDER', id: '1' };
    service.send(bumpEvent);

    expect(mockToSend).toHaveBeenNthCalledWith(3, bumpEvent);
  });
});

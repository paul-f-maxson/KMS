const { interpret } = require('xstate');

const makeOrdersMachine = require('./');

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
  const machine = makeOrdersMachine(io);
  const order = { table: 100, meals: [{ seat: 1, dish: 'apples' }] };
  const id = '1';
  const event = { type: 'ADD', id, delay: 1000, order };

  interpret(machine)
    .start()
    .send(event);

  expect(mockEmit).toHaveBeenCalledWith('newOrder', event);
});

test('add order creates correctly namespaced io', () => {
  const { io, mockTo } = makeDummyIO();
  const machine = makeOrdersMachine(io);
  const order = { table: 100, meals: [{ seat: 1, dish: 'apples' }] };
  const id = '1';
  const event = { type: 'ADD', id, delay: 1000, order };

  interpret(machine)
    .start()
    .send(event);

  expect(mockTo).toHaveBeenCalledWith(`order:${event.id}`);
});

test('start order emits order update event', () => {
  const { io, mockToEmit } = makeDummyIO();
  const machine = makeOrdersMachine(io);
  const order = { table: 100, meals: [{ seat: 1, dish: 'apples' }] };
  const id = '1';
  const addEvent = { type: 'ADD', id, delay: 1000, order };

  const service = interpret(machine).start();

  service.send(addEvent);

  service.send({ type: 'FIRE_ORDER', id: '1' });

  expect(mockToEmit).toHaveBeenCalledWith('orderUpdate', { state: 'ready' });
});

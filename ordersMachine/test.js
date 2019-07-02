const { interpret } = require('xstate');

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

test('add order adds an order', () => {
  const { io } = makeDummyIO();
  const machine = require('./')(io);
  const order = { table: 100, meals: [{ seat: 1, dish: 'apples' }] };
  const id = '1';
  const event = { type: 'ADD', id, delay: 1000, order };

  interpret(machine)
    .start()
    .onChange(context => {
      expect(context.orders.get('1').state.context.order).toEqual(order);
    })
    .send(event);
});

test('add order emits update event', () => {
  const { io, mockEmit } = makeDummyIO();
  const machine = require('./')(io);
  const order = { table: 100, meals: [{ seat: 1, dish: 'apples' }] };
  const id = '1';
  const event = { type: 'ADD', id, delay: 1000, order };

  interpret(machine)
    .start()
    .send(event);

  expect(mockEmit).toHaveBeenCalledWith('newOrder', event);
});

test('start order emits order update event', () => {
  const { io, mockToEmit } = makeDummyIO();
  const machine = require('./')(io);
  const order = { table: 100, meals: [{ seat: 1, dish: 'apples' }] };
  const id = '1';
  const addEvent = { type: 'ADD', id, delay: 1000, order };

  const service = interpret(machine).start();

  service.send(addEvent);

  service.send({ type: 'FIRE_ORDER', id: '1' });

  expect(mockToEmit).toHaveBeenCalledWith('orderUpdate', { state: 'ready' });
});

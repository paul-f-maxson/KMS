const { interpret } = require('xstate');

// Dummy socket.IO instance
const io = { to: () => ({ emit: () => {} }), emit: () => {} };
const machine = require('./')(io);

const service = interpret(machine).start();

service.send({
  type: 'ADD',
  id: '1',
  delay: 1000,
  order: { table: 100, meals: [{ seat: 1, dish: 'apples' }] },
});

setTimeout(() => service.send({ type: 'START_ORDER', id: '1' }), 2000);
setTimeout(() => service.send({ type: 'BUMP_ORDER', id: '1' }), 3000);

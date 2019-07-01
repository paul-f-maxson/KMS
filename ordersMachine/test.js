const { interpret } = require('xstate');
const machine = require('./')({ emit: () => {} });

const service = interpret(machine).start();

service.send({
  type: 'ADD',
  id: '1',
  order: { table: 100, meals: [{ seat: 1, dish: 'apples' }] },
});

service.send({ type: 'FIRE', id: '1' });
service.send({ type: 'START', id: '1' });
service.send({ type: 'BUMP', id: '1' });

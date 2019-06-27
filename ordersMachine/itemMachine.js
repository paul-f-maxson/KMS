const { Machine, sendParent } = require('xstate');

module.exports = Machine({
  id: 'item',
  initial: 'delayed',
  states: {
    delayed: {
      id: 'delayed',
      after: [
        {
          delay: ctx => ctx.delay,
          target: 'waiting',
        },
      ],
      on: { FIRE: 'waiting' },
    },
    waiting: { id: 'waiting', on: { START: 'working' } },
    working: { id: 'working', on: { BUMP: 'done' } },
    done: { id: 'done', type: 'final' },
  },
  onDone: { actions: [sendParent({ type: 'item.done' })] },
});

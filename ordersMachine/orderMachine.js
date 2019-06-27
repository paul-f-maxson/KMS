const { Machine } = require('xstate');

module.exports = Machine({
  id: 'order',
  initial: 'delayed',
  states: {
    delayed: {
      id: 'delayed',
      after: [
        {
          delay: ctx => ctx.delay,
          target: 'working',
        },
      ],
      on: { START: 'working' },
    },
    working: { id: 'working', on: { BUMP: 'done' } },
    done: { id: 'done', type: 'final' },
  },
});

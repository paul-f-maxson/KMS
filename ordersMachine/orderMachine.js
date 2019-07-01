const {
  Machine,
  sendParent,
  actions: { log },
} = require('xstate');

const defaultConfig = {
  actions: {
    log: log((ctx, evt) => evt),
    sendParentDone: ctx => sendParent({ type: 'DONE', id: ctx.id }),
  },
  delays: {
    DELAY: ctx => ctx.delay,
  },
};

module.exports = [
  Machine(
    {
      id: 'order',
      initial: 'delayed',
      states: {
        delayed: {
          id: 'delayed',
          onEntry: 'log',
          after: {
            DELAY: 'ready',
          },
          on: { FIRE: 'ready' },
        },
        ready: {
          id: 'ready',
          onEntry: ['log', 'emitFired'],
          on: { START: 'working' },
        },
        working: {
          id: 'working',
          onEntry: ['log', 'emitStarted'],
          on: { BUMP: 'done' },
        },
        done: { id: 'done', onEntry: 'log', type: 'final' },
      },
      onDone: { target: '.done', actions: 'sendParentDone' },
    },
    defaultConfig
  ),
  {}, // default context
  defaultConfig,
];

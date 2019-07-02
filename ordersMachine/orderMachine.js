const {
  Machine,
  send,
  sendParent,
  actions: { log },
} = require('xstate');

const { emit } = require('./actions');

module.exports = io => {
  const emitFired = emit(io, `orderUpdate`, () => ({ state: 'ready' }));
  const emitStarted = emit(io, `orderUpdate`, () => ({ state: 'working' }));

  const defaultConfig = {
    actions: {
      log: log(
        (ctx, evt) => ({
          id: ctx.id,
          evt,
        }),
        'order log:'
      ),

      emitFired,
      emitStarted,

      sendParentDone: sendParent(ctx => ({ type: 'ORDER_DONE', id: ctx.id })),
    },

    delays: {
      DELAY: ctx => ctx.delay,
    },
  };

  return [
    Machine(
      {
        id: 'order',
        initial: 'delayed',

        states: {
          delayed: {
            id: 'delayed',
            entry: ['log', send('FIRE_ORDER', { delay: ctx => ctx.delay })],

            on: { ['FIRE_ORDER']: 'ready' },
          },

          ready: {
            id: 'ready',
            entry: ['log', 'emitFired'],
            on: { ['START_ORDER']: 'working' },
          },

          working: {
            id: 'working',
            entry: ['log', 'emitStarted'],
            on: { ['BUMP_ORDER']: 'done' },
          },

          done: { id: 'done', entry: 'log', type: 'final' },
        },

        onDone: { actions: 'sendParentDone' },
      },
      defaultConfig
    ),
    {}, // default context
    defaultConfig,
  ];
};

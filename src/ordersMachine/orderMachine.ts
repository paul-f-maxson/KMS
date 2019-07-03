import XState, { Machine, send, sendParent, actions } from 'xstate';
const { log } = actions;

import { emit } from './actions';

interface OrderContext {
  id: string;
  delay: number;
  order: {
    table: number;
    meals: Array<{ seat: number; dish: string }>;
  };
}

type OrderEvent =
  | { type: 'FIRE_ORDER' }
  | { type: 'START_ORDER' }
  | { type: 'BUMP_ORDER' };

interface OrderStateSchema {
  states: {
    delayed: {};
    ready: {};
    working: {};
    done: {};
  };
}

module.exports = (io: SocketIO.Socket) => {
  const emitFired = emit(io, 'orderUpdate', () => ({ state: 'ready' }));

  const emitStarted = emit(io, `orderUpdate`, () => ({ state: 'working' }));

  const sendParentDone = sendParent(
    (ctx: OrderContext): XState.EventObject => ({
      type: 'ORDER_DONE',
      id: ctx.id,
    })
  );

  const defaultConfig = {
    actions: {
      log: () => {} /* log(
        (ctx, evt) => ({
          id: ctx.id,
          evt,
        }),
        'order log:'
      ) */,

      emitFired,
      emitStarted,

      sendParentDone,
    },

    delays: {
      DELAY: (ctx: OrderContext) => ctx.delay,
    },
  };

  return [
    Machine<OrderContext, OrderStateSchema, OrderEvent>(
      {
        id: 'order',
        initial: 'delayed',

        states: {
          delayed: {
            id: 'delayed',
            entry: [
              'log',
              send('FIRE_ORDER', { delay: (ctx: OrderContext) => ctx.delay }),
            ],

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

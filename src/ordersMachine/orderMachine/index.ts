export * from './types';

import XState, {
  Machine,
  send,
  sendParent,
  actions,
  StateMachine,
  MachineOptions,
} from 'xstate';
import { updateContext } from 'xstate/lib/utils';
const { log } = actions;

import { emit } from '../actions';
import { OrderContext, OrderStateSchema, OrderEvent } from './types';

export default (io: SocketIO.Socket) => {
  const emitFired = emit(io, 'orderUpdate', () => ({ state: 'ready' }));

  const emitStarted = emit(io, `orderUpdate`, () => ({ state: 'working' }));

  const sendParentDone = sendParent(
    (ctx: OrderContext): XState.EventObject => ({
      type: 'ORDER_DONE',
      id: ctx.id,
    })
  );

  const defaultContext: OrderContext = {
    id: '',
    delay: 0,
    table: '',
    meals: [],
  };

  const defaultOptions = {
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

    guards: {},
    activities: {},
    services: {},
    updater: updateContext,
  };

  const machine = Machine<OrderContext, OrderStateSchema, OrderEvent>(
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
    defaultOptions
  );

  return [machine, defaultContext, defaultOptions] as [
    StateMachine<OrderContext, OrderStateSchema, OrderEvent>,
    OrderContext,
    MachineOptions<OrderContext, OrderEvent>
  ];
};

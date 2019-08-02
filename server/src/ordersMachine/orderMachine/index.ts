import debug from 'debug';
const log = (id: string) => debug(`kms:order${id}:log`);

import XState, {
  Machine,
  send,
  sendParent,
  StateMachine,
  MachineOptions,
} from 'xstate';
import * as XStateUtils from 'xstate/lib/utils';

import { socketSend } from '../actions';

import { OrderContext, OrderStateSchema, OrderEvent } from 'kms-types';

export default (io: SocketIO.Server, id: string) => {
  const socketNsp = io.of(`/order:${id}`);

  const emitEvent = socketSend(
    socketNsp,
    // No need to send id because the io will be namespaced with the id
    (_, evt) => evt
  );

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
      log: (ctx: OrderContext, evt: OrderEvent) => {
        log(ctx.id)(`event: ${JSON.stringify(evt)}`);
      },

      emitEvent,

      sendParentDone,
    },

    delays: {
      DELAY: (ctx: OrderContext) => ctx.delay,
    },

    guards: {},
    activities: {},
    services: {},
    updater: XStateUtils.updateContext,
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
          entry: ['log', 'emitEvent'],
          on: { ['START_ORDER']: 'working' },
        },

        working: {
          id: 'working',
          entry: ['log', 'emitEvent'],
          on: { ['BUMP_ORDER']: 'done' },
        },

        done: { id: 'done', entry: ['log', 'emitEvent'], type: 'final' },
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

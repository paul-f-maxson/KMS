import debug from 'debug';
const log = debug('kms:ordersmachine:log');

import makeOrderMachine from './orderMachine';

import { Machine, assign, spawn, send } from 'xstate';

import { socketSend } from './actions';

import {
  OrdersContext,
  AddOrderEvent,
  OrderDoneEvent,
  OrdersStateSchema,
  OrdersEvent,
  OrderEvent,
} from 'kms-types';

export default (io: SocketIO.Server) => {
  const socketNsp = io.of('/machine');
  // CONTEXT MODIFICATION ACTIONS
  // TODO: validate new order
  const addOrder = assign<OrdersContext, AddOrderEvent>({
    orders: (ctx, evt) => {
      // Import the machine to be used as an actor, passing it a socket namespace based on the id
      const [orderMachine, orderMachineDefaultContext] = makeOrderMachine(
        io,
        evt.order.id
      );

      // Spawn the new actor, passing the order and id in as context (without overiding any other context values the machine might have).
      // Add this new actor to the orders Map, keying it by the order's id
      ctx.orders.set(
        evt.order.id,

        spawn(
          orderMachine.withContext({
            ...orderMachineDefaultContext,
            ...evt.order,
          }),

          evt.order.id
        )
      );

      // Return a copy of the orders Map (for purity's sake)
      return new Map(ctx.orders.entries());
    },
  });

  const removeOrder = assign<OrdersContext, OrderDoneEvent>({
    orders: (ctx, evt) => {
      ctx.orders.delete(evt.id);

      return new Map(ctx.orders.entries());
    },
  });

  // CHILD ACTOR COMMUNICATION ACTIONS
  const forwardToOrder = send<OrdersContext, OrderEvent>((_, evt) => evt, {
    to: (ctx, evt) => ctx.orders.get(evt.id),
  });

  // SOCKET SIDE EFFECT ACTIONS
  // Forward the recieved event to the socket
  const emitEvent = socketSend(socketNsp, (_, evt) => evt);

  return Machine<OrdersContext, OrdersStateSchema, OrdersEvent>(
    {
      id: 'orders',

      context: {
        orders: new Map(),
      },

      initial: 'active',

      states: {
        active: {
          id: 'active',

          on: {
            ADD: {
              actions: ['log', 'addOrder', 'emitEvent'],
            },

            FIRE_ORDER: {
              actions: ['log', 'forwardToOrder'],
            },

            START_ORDER: {
              target: '.',
              actions: ['log', 'forwardToOrder'],
            },

            BUMP_ORDER: {
              actions: ['log', 'forwardToOrder'],
            },

            ORDER_DONE: {
              actions: ['log', 'removeOrder', 'emitEvent'],
            },
          },
        },
      },
    },

    {
      actions: {
        addOrder,
        forwardToOrder,
        removeOrder,
        emitEvent,
        log: (_, evt) => log(`event: ${JSON.stringify(evt)}`),
      },
    }
  );
};

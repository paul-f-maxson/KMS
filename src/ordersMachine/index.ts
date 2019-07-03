const makeOrderMachine = require('./orderMachine');

import XState, { Machine, assign, spawn, send, actions } from 'xstate';
const { log } = actions;

import { emit } from './actions';
import { OrderContext, OrderEvent, Order } from './orderMachine';
import { Actor } from 'xstate/lib/Actor';

export interface OrdersContext {
  orders: Map<string, Actor<OrderContext, OrderEvent>>;
}

export interface OrdersStateSchema {
  states: {
    active: {};
  };
}

type AddOrderEvent = { type: 'ADD'; id: string; delay: number; order: Order };

type OrderDoneEvent = { type: 'ORDER_DONE'; id: string };

export type OrdersEvent = AddOrderEvent | OrderDoneEvent | OrderEvent;

// export type OrdersEvent = { type: 'ADD'; delay: number; order: Order };

export default (io: SocketIO.Socket) => {
  // CONTEXT MODIFICATION ACTIONS
  // TODO: validate new order
  const addOrder = assign<OrdersContext, AddOrderEvent>({
    orders: (ctx, evt) => {
      // Import the machine to be used as an actor, passing it a socket namespace based on the id
      const [orderMachine, orderMachineDefaultContext] = makeOrderMachine(
        io.to(`order:${evt.id}`)
      );

      // Spawn the new actor, passing the order and id in as context (without overiding any other context values the machine might have).
      // Add this new actor to the orders Map, keying it by the order's id
      ctx.orders.set(
        evt.id,

        spawn(
          orderMachine.withContext({
            ...orderMachineDefaultContext,
            order: evt.order,
            id: evt.id,
            delay: evt.delay,
          }),

          evt.id
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
  const forwardToOrder = send<OrdersContext, OrderEvent>((ctx, evt) => evt, {
    to: (ctx, evt) => ctx.orders.get(evt.id),
  });

  // SOCKET SIDE EFFECT ACTIONS
  // Forward the recieved event to the socket
  const emitNewOrder = emit<OrdersContext, AddOrderEvent>(
    io,
    'newOrder',
    (ctx, evt) => evt
  );

  // Forward the recieved event to the socket
  const emitRemovedOrder = emit(io, 'orderRemoved', (ctx, evt) => evt);

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
              actions: ['log', 'addOrder', 'emitNewOrder'],
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
              actions: ['log', 'removeOrder', 'emitRemovedOrder'],
            },
          },
        },
      },
    },

    {
      actions: {
        addOrder,
        emitNewOrder,
        forwardToOrder,
        removeOrder,
        emitRemovedOrder,
        log: () => {} /* log((ctx, evt) => evt, 'controller log:') */,
      },
    }
  );
};

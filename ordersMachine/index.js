const R = require('ramda');

const {
  Machine,
  assign,
  spawn,
  send,
  actions: { log },
} = require('xstate');

const { emit } = require('./actions');

const [
  orderMachine,
  orderMachineDefaultContext,
  orderMachineDefaultConfig,
] = require('./orderMachine');

module.exports = io => {
  // TODO: These are only used by the order machine and should therefor be defined by that module.
  // I'm doing it here because it makes the dependency web less complex re: the order's id.
  // Probably the better thing to do would be to create a namespace based on the order's id.
  // The orderMachine module could be dependent on an io like this module is, and this namespace could be passed in to the require.
  const emitFired = id =>
    emit(io, `orderUpdate:${id}`, () => ({ state: 'ready' }));
  const emitStarted = id =>
    emit(io, `orderUpdate:${id}`, () => ({ state: 'working' }));

  // TODO: validate new order
  const addOrder = assign({
    orders: (ctx, evt) =>
      ctx.orders.set(
        evt.id,
        spawn(
          orderMachine
            .withContext({
              ...orderMachineDefaultContext,
              order: evt.order,
              id: evt.id,
              /** TODO: get delay from config */
              delay: 1000,
            })
            .withConfig({
              ...orderMachineDefaultConfig,
              actions: {
                ...orderMachineDefaultConfig.actions,
                emitFired: emitFired(evt.id),
                emitStarted: emitStarted(evt.id),
              },
            }),
          evt.id
        )
      ),
  });

  const emitNewOrder = emit(io, 'newOrder', (ctx, evt) => evt);

  const emitRemovedOrder = emit(io, 'orderRemoved', (ctx, evt) => evt);

  const forwardToOrder = send((ctx, evt) => evt, {
    to: (ctx, evt) => ctx.orders.get(evt.id),
  });

  const removeOrder = assign({
    orders: (ctx, evt) => {
      ctx.orders.delete(evt.id);
      return ctx.orders;
    },
  });

  return Machine(
    {
      id: 'orders',
      context: {
        orders: new Map(),
      },
      initial: 'active',
      states: {
        active: {},
      },
      on: {
        ADD: {
          target: '.active',
          actions: ['log', 'addOrder', 'emitNewOrder'],
        },
        FIRE: {
          target: '.active',
          actions: ['log', 'forwardToOrder'],
        },
        START: {
          target: '.active',
          actions: ['log', 'forwardToOrder'],
        },
        BUMP: {
          target: '.active',
          actions: ['log', 'forwardToOrder'],
        },
        DONE: {
          target: '.active',
          actions: ['log', 'removeOrder', 'emitRemovedOrder'],
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
        log: log((ctx, evt) => evt),
      },
    }
  );
};

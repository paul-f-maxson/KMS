const {
  Machine,
  assign,
  actions: { log },
} = require('xstate');

// const { itemMachine } = require('./itemMachine');

const updateOrders = (ctx, event) => [...ctx.orders, event.order];

// TODO: validate new order
const addOrder = assign({
  orders: updateOrders,
});

// TODO: Can't have to type long strings for action names
module.exports = io => {
  const { emitOverSocket } = require('./actionCreators')(io);

  return Machine(
    {
      id: 'orders',
      context: {
        orders: [],
      },
      initial: 'active',
      states: {
        active: {},
      },
      on: {
        ADD: {
          target: '.active',
          actions: ['addOrder', 'log', 'emitNewOrdersUpdateOverSocket'],
        },
      },
    },
    {
      actions: {
        log: log(),
        addOrder,
        emitNewOrdersUpdateOverSocket: emitOverSocket('update', (ctx, evt) => ({
          orders: [...ctx.orders, evt.order],
        })),
      },
    }
  );
};

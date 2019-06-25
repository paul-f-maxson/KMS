const { Machine, assign } = require('xstate');

// TODO: validate new order
const addOrder = assign({
  orders: (ctx, event) => [...ctx.orders, event.order],
});

module.exports = Machine(
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
      ADD: { target: '.active', actions: 'addOrder' },
    },
  },
  {
    actions: { addOrder },
  }
);

import { Machine, assign } from 'xstate';

const addOrder = assign({
  orders: (ctx, event) => [...ctx.orders, event.order],
});

export default Machine(
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

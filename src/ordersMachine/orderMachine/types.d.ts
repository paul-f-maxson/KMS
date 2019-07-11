import { Order } from '../../types';

export type OrderContext = Order;

interface OrderStateSchema {
  states: {
    delayed: {};
    ready: {};
    working: {};
    done: {};
  };
}

export type OrderEvent = {
  type: 'FIRE_ORDER' | 'START_ORDER' | 'BUMP_ORDER';
  id: string;
};

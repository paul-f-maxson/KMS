import { Actor } from 'xstate/lib/Actor';
import { OrderContext, OrderEvent } from './orderMachine';
import { Order } from '../types';

export interface OrdersContext {
  orders: Map<string, Actor<OrderContext, OrderEvent>>;
}

export interface OrdersStateSchema {
  states: {
    active: {};
  };
}

type AddOrderEvent = { type: 'ADD'; order: Order };

type OrderDoneEvent = { type: 'ORDER_DONE'; id: string };

export type OrdersEvent = AddOrderEvent | OrderDoneEvent | OrderEvent;

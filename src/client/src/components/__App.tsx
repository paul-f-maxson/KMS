import React from 'react';
import Ticket from './Ticket';
import { Order } from '../../../types';

const orders: Array<Order> = [
  { id: '1', delay: 1000, table: 101, meals: [{ seat: 1, dish: 'apples' }] },
  { id: '2', delay: 1000, table: 102, meals: [{ seat: 1, dish: 'apples' }] },
  { id: '3', delay: 1000, table: 103, meals: [{ seat: 1, dish: 'apples' }] },
  { id: '4', delay: 1000, table: 104, meals: [{ seat: 1, dish: 'apples' }] },
];

export default () => (
  <>
    <h1>Tickets</h1>
    <ul>
      {orders.map(order => (
        <li key={order.id}>
          <Ticket {...order} />
        </li>
      ))}
    </ul>
  </>
);

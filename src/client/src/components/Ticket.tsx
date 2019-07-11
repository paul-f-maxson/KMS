import React from 'react';
import { Order } from '../../../types';

const Ticket: React.FC<Order> = ({ table, meals }) => (
  <>
    <h2>{table}</h2>
    {meals.map(({ seat, dish }) => (
      <ul>
        <li>
          <h3>{seat}</h3>
          <p>{dish}</p>
        </li>
      </ul>
    ))}
  </>
);

export default Ticket;

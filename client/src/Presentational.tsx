import React from 'react';

export interface PresentationalProps {
  orders: Array<{
    table: number;
    meals: Array<{ seat: number; dish: string }>;
  }>;
}

export default ({ orders }: PresentationalProps = { orders: [] }) => (
  <>
    <h1>Tickets</h1>
    {orders.map(order => (
      <>
        <h2>{order.table}</h2>
        <ul>
          {order.meals.map(meal => (
            <li>
              <h3>{meal.seat}</h3>
              <p>{meal.dish}</p>
            </li>
          ))}
        </ul>
      </>
    ))}
  </>
);

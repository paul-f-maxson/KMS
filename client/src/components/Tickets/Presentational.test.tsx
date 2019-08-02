import React from 'react';
import { render } from 'enzyme';

import Presentational from './Presentational';
import { Order } from 'kms-types';

describe('Presentational component', () => {
  it('Displayed text matches /no.*tickets/i when the orders object is empty', () => {
    const orders: Array<Order> = [];
    const $ = render(<Presentational orders={orders} />);

    expect($.text()).toMatch(/no.*tickets/i);
  });

  it('Does not render a ul when the orders object is empty', () => {
    const orders: Array<Order> = [];
    const $ = render(<Presentational orders={orders} />);

    expect($.find('ul').html()).toBeFalsy();
  });

  it('renders a ul of the correct number tickets when an orders object is passed as props', () => {
    const orders: Array<Order> = [
      {
        id: '1',
        delay: 1000,
        table: 101,
        meals: [{ seat: 1, id: '11', dish: 'apples' }],
      },
      {
        id: '2',
        delay: 1000,
        table: 102,
        meals: [{ seat: 2, id: '12', dish: 'bananas' }],
      },
      {
        id: '3',
        delay: 1000,
        table: 103,
        meals: [
          { seat: 1, id: '11', dish: 'apples' },
          { seat: 3, id: '13', dish: 'grapes' },
        ],
      },
    ];

    const $ = render(<Presentational orders={orders} />);

    // remove everything below the highest level li tags
    $.find('li').empty();

    expect($.find('li').length).toBe(3);
  });
});

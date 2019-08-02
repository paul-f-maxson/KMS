import React from 'react';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';

import Tickets from '.';

import Presentational from './Presentational';

describe('<Tickets />', () => {
  it('Passes empty orders array to <Presentational /> by default', () => {
    act(() => {
      const $ = mount(<Tickets />);

      expect($.find(Presentational).props().orders).toEqual([]);

      $.unmount();
    });
  });

  // TODO: mock socket
  xit('Passes the orders array to <Presentational />', () => {
    const order1 = {
      id: '1',
      delay: 1000,
      table: 101,
      meals: [{ seat: 1, id: '11', dish: 'apples' }],
    };

    const Test: React.FC = () => <Tickets />;

    act(() => {
      const $ = mount(<Test />);

      // socket.send({ type: 'ADD', order: order1 });

      expect($.find(Presentational).prop('orders')).toEqual([order1]);

      $.unmount();
    });
  });
});

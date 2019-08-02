import React from 'react';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';

import { makeMockSocket } from '../../test-utils';

import Tickets from '.';

import { SocketRootContext } from '../SocketConnect';
import Presentational from './Presentational';

describe('<Tickets />', () => {
  it('Passes empty orders array to <Presentational /> by default', () => {
    const { mockSocket: socket } = makeMockSocket();

    act(() => {
      const $ = mount(
        <SocketRootContext.Provider
          value={(socket as unknown) as SocketIOClient.Socket}
        >
          <Tickets />
        </SocketRootContext.Provider>
      );

      expect($.find(Presentational).props().orders).toEqual([]);

      $.unmount();
    });
  });

  // This test does not pass, even though the internal workings of the Ticket are in order. It seems like enzyme is just not seeing the props that are being passed.
  it('Passes the orders array to <Presentational />', () => {
    const { mockSocket: socket } = makeMockSocket();

    const order1 = {
      id: '1',
      delay: 1000,
      table: 101,
      meals: [{ seat: 1, id: '11', dish: 'apples' }],
    };

    const Test: React.FC = () => (
      <SocketRootContext.Provider
        value={(socket as unknown) as SocketIOClient.Socket}
      >
        <Tickets />
      </SocketRootContext.Provider>
    );

    act(() => {
      const $ = mount(<Test />);

      socket.emit('update', { type: 'ADD', order: order1 });

      expect($.find(Presentational).prop('orders')).toEqual([order1]);

      $.unmount();
    });
  });
});

import React from 'react';
import ReactDOM from 'react-dom';

import useSocketSubscribe from './useSocketSubscribe';
import { Order, OrdersEvent } from 'kms-types';

/**
 * @summary Creates and renders a function component that simply calls the passed callback and renders nothing
 *
 * @param callback - a function which should be or call the hook you wish to test
 *
 * @returns a function that cleans up the DOM from the test render
 */
const testHook = (callback: Function) => {
  // The function component that will call the callback
  const TestHook: React.FC<{ callback: Function }> = ({ callback }) => {
    callback();
    return null;
  };

  // Render the function component
  const div = document.createElement('div');
  ReactDOM.render(<TestHook callback={callback} />, div);

  // Return a cleanup function
  return () => {
    ReactDOM.unmountComponentAtNode(div);
  };
};

const makeMockSocket = () => {
  let listenerEventType: string | null;
  let listener: Function | null;

  const mockOn = jest
    .fn((eventType: string, cb: Function) => {
      listenerEventType = eventType;
      listener = cb;
    })
    .mockName('mockOn');

  const mockEmit = jest.fn((eventType: string, ...rest: any[]) => {
    if (listener && listenerEventType && eventType === listenerEventType) {
      listener(...rest);
    }
  });

  const mockOff = jest.fn((eventType: string, cb: Function) => {
    listener = listenerEventType = null;
  });

  return {
    mockOn,
    mockEmit,
    mockOff,
    socket: {
      // NOTE: subsequent calls to this mock socket.on will OVERWRITE previously subscribed listeners
      on: mockOn,
      emit: mockEmit,
      off: mockOff,
    },
  };
};

describe('testHook', () => {
  it('calls the passed cb', () => {
    const mockCb = jest.fn().mockName('mockCb');
    const cleanup = testHook(mockCb);
    cleanup();

    expect(mockCb).toHaveBeenCalled();
  });
});

describe('useSocketSubscribe', () => {
  it('creates subscriptions', () => {
    const { mockOn, socket } = makeMockSocket();

    const listener = () => {};

    const cleanup = testHook(() => {
      useSocketSubscribe(
        (socket as unknown) as SocketIOClient.Socket,
        ['A', 'B', 'C'],
        listener
      );
    });
    cleanup();

    expect(mockOn).toHaveBeenCalledTimes(3);
  });

  it('keeps the socket subscribed until the component unmounts', () => {
    const mockListener = jest.fn().mockName('mockReducer');
    const { mockOff, socket } = makeMockSocket();

    const cleanup = testHook(() => {
      useSocketSubscribe(
        (socket as unknown) as SocketIOClient.Socket,
        ['newOrder'],
        mockListener
      );
    });

    expect(mockOff).not.toHaveBeenCalled();
    cleanup();
    expect(mockOff).toHaveBeenCalled();
  });

  it('calls the passed listener when the passed event is emitted', () => {
    const mockListener = jest.fn().mockName('mockReducer');
    const { mockOff, socket } = makeMockSocket();

    const cleanup = testHook(() => {
      useSocketSubscribe(
        (socket as unknown) as SocketIOClient.Socket,
        ['newOrder'],
        mockListener
      );
    });

    const order: Order = {
      id: '1',
      table: 100,
      delay: 1000,
      meals: [{ seat: 1, id: '1', dish: 'apples' }],
    };

    const event: OrdersEvent = { type: 'ADD', order };

    try {
      socket.emit('newOrder', event);
    } catch (e) {
      console.log(e);
    }

    expect(mockListener).toHaveBeenCalledWith(event);

    cleanup();
  });
});

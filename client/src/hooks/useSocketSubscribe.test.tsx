import useSocketSubscribe from './useSocketSubscribe';
import { Order, OrdersEvent } from 'kms-types';

import { testHook, makeMockSocket } from '../test-utils';

describe('useSocketSubscribe', () => {
  it('creates subscriptions', () => {
    const { mockOn, mockSocket: socket } = makeMockSocket();

    const listener = () => {};

    expect(socket.listenerEventType).toEqual(null);

    const cleanupTest = testHook(() => {
      useSocketSubscribe(
        (socket as unknown) as SocketIOClient.Socket,
        'A',
        listener
      );
    });

    // NOTE: this passes if cleanup happens before this expect

    expect(mockOn).toHaveBeenNthCalledWith(1, 'A', listener);

    cleanupTest();
  });

  it('keeps the socket subscribed until the component unmounts', () => {
    const mockListener = jest.fn().mockName('mockReducer');
    const { mockOff, mockSocket: socket } = makeMockSocket();

    const cleanupTest = testHook(() => {
      useSocketSubscribe(
        (socket as unknown) as SocketIOClient.Socket,
        'update',
        mockListener
      );
    });

    expect(mockOff).not.toHaveBeenCalled();
    cleanupTest();
    expect(mockOff).toHaveBeenCalled();
  });

  it('calls the passed listener when the passed event is emitted', () => {
    const mockListener = jest.fn().mockName('mockListener');
    const { mockOn, mockSocket: socket } = makeMockSocket();

    const order: Order = {
      id: '1',
      table: 100,
      delay: 1000,
      meals: [{ seat: 1, id: '1', dish: 'apples' }],
    };

    const event: OrdersEvent = { type: 'ADD', order };

    const cleanupTest = testHook(() => {
      useSocketSubscribe(
        (socket as unknown) as SocketIOClient.Socket,
        'update',
        mockListener
      );
    });

    expect(mockOn).toHaveBeenCalled();

    socket.emit('update', event);

    expect(mockListener).toHaveBeenCalledWith(event);

    cleanupTest();
  });
});

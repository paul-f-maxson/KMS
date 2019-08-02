import useSocketSubscribe from './useSocketSubscribe';

import { testHook } from '../test-utils';

// TODO: mock socket
describe('useSocketSubscribe', () => {
  xit(`calls the passed listener when a 'message' event is emitted`, () => {
    const mockListener = jest.fn().mockName('mockListener');

    const event = { type: 'TEST' };

    const cleanupTest = testHook(() => {
      useSocketSubscribe('update', mockListener);
    });

    // socket.send( event);

    expect(mockListener).toHaveBeenCalledWith(event);

    cleanupTest();
  });
});

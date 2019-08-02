import { testHook, makeMockSocket } from '.';

xdescribe('test utils', () => {
  test('testHook calls the passed cb', () => {
    const mockCb = jest.fn().mockName('mockCb');
    const cleanup = testHook(mockCb);
    cleanup();

    expect(mockCb).toHaveBeenCalled();
  });

  // Disabling because it tests internal implementation that can't be tested on a real socket
  test('mock socket sets listenerEventType on .on()', () => {
    const { mockSocket: socket } = makeMockSocket();

    const cb = jest.fn().mockName('cb');

    expect(socket.listenerEventType).toBe(null);

    socket.on('A', cb);

    expect(socket.listenerEventType).toBe('A');
  });

  test('mock socket calls subscription callbacks on emit', () => {
    const { mockSocket: socket } = makeMockSocket();

    const cb = jest.fn().mockName('cb');

    socket.on('A', cb);

    socket.emit('A');

    expect(cb).toHaveBeenCalled();
  });
});

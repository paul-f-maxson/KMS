import { testHook } from '.';

xdescribe('test utils', () => {
  test('testHook calls the passed cb', () => {
    const mockCb = jest.fn().mockName('mockCb');
    const cleanup = testHook(mockCb);
    cleanup();

    expect(mockCb).toHaveBeenCalled();
  });
});

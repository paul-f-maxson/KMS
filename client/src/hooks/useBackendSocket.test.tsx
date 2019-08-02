import { testHook, makeMockSocket } from '../test-utils';
import useBackendSocket from './useBackendSocket';
import { act } from 'react-dom/test-utils';
import React, { useEffect } from 'react';
import { mount } from 'enzyme';

describe('useBackendSocket', () => {
  it('updates state based on events the socket emits', () => {
    const { mockSocket: socket } = makeMockSocket();

    const mockReducer: React.Reducer<number, { value: number }> = (
      state,
      event
    ) => state + event.value;

    const event = { value: 1 };

    const Spy: React.FC<{ p: any }> = ({ p }) => null;

    const Test: React.FC = () => {
      const [localState] = useBackendSocket(
        (socket as unknown) as SocketIOClient.Socket,
        'A',
        mockReducer,
        0
      );

      useEffect(() => {
        socket.emit('A', event);
      }, []);

      return <Spy p={localState} />;
    };

    act(() => {
      const $ = mount(<Test />);

      $.update();

      expect($.find(Spy).prop('p')).toEqual(1);

      $.unmount();
    });
  });
});

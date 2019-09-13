import useBackendState from './useBackendState';
import { act } from 'react-dom/test-utils';
import React, { useEffect } from 'react';
import { mount } from 'enzyme';

describe('useBackendSocket', () => {
  // TODO: Mock socket
  xit('updates state based on events the socket emits', () => {
    const mockReducer: React.Reducer<number, { value: number }> = (
      state,
      event
    ) => state + event.value;

    const event = { value: 1 };

    const Spy: React.FC<{ p: any }> = ({ p }) => null;

    const Test: React.FC = () => {
      const localState = useBackendState('A', mockReducer, 0);

      useEffect(() => {
        // socket.send(event);
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

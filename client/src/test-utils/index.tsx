import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';

export const makeMockSocket = () => {
  let listenerEventType: string | null = null;
  let listener: Function | null = null;

  const mockOn = jest
    .fn((eventType: string, cb: Function) => {
      listenerEventType = eventType;
      listener = cb;
    })
    .mockName('mockOn');

  const mockEmit = jest
    .fn((eventType: string, ...rest: any[]) => {
      if (listener && listenerEventType && eventType === listenerEventType) {
        /* console.log(
          `.emit() called and${'\n\t'}listener: ${listener}${'\n\t'}listener event type: ${listenerEventType}`
        ); */
        listener(...rest);
      } else
        console.error(
          `Socket Error -- .emit() called but${'\n\t'}listener: ${listener}${'\n\t'}listener event type: ${listenerEventType}`
        );
    })
    .mockName('mockEmit');

  const mockOff = jest
    .fn((eventType: string, cb: Function) => {
      listener = listenerEventType = null;
    })
    .mockName('mockOff');

  return {
    get listenerEventType() {
      return listenerEventType;
    },
    mockOn,
    mockEmit,
    mockOff,
    mockSocket: {
      // NOTE: subsequent calls to this mock socket.on will OVERWRITE previously subscribed listeners
      on: mockOn,
      emit: mockEmit,
      off: mockOff,
      // NOTE: Prefer not to use these as they depend on internal implementation
      get listenerEventType() {
        return listenerEventType;
      },
      get listener() {
        return listener;
      },
    },
  };
};

/**
 * @summary Creates and renders a function component that simply calls the passed callback and renders nothing
 *
 * @param callback - a function which should be or call the hook you wish to test
 *
 * @returns a function that cleans up the DOM from the test render
 */
export const testHook = (callback: Function) => {
  // The function component that will call the callback
  const TestHook: React.FC<{ callback: Function }> = ({ callback }) => {
    callback();
    return null;
  };

  // Render the function component
  const div = document.createElement('div');
  act(() => {
    ReactDOM.render(<TestHook callback={callback} />, div);
  });

  // Return a cleanup function
  return () => {
    ReactDOM.unmountComponentAtNode(div);
  };
};

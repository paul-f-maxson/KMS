import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';

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

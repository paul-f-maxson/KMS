import { useCallback } from 'react';
import { Action } from 'kms-types';

// TODO: Get from external config
const apiURI = '/api/dispatch/';

const baseFetchOptions: RequestInit = {
  method: 'POST',
  mode: 'cors',
  headers: { 'Content-type': 'application/json' },
  body: '',
};

const makeFetchOptions: (action: Action) => RequestInit = action => ({
  ...baseFetchOptions,
  body: JSON.stringify(action),
});

/** A hook for sending actions to the state machine running on the server
 *
 * @returns a function for sending an action to the server state machine
 */
export default () => {
  const backendDispatch = useCallback((action: Action) => {
    fetch(apiURI, makeFetchOptions(action));
  }, []);

  return backendDispatch;
};

/* import debug from 'debug';
const sendLog = debug('kms:socketsend:log'); */

import * as XState from 'xstate';
import { Action } from 'kms-types';

/** Configures an action creator for an action that emits an event over the socket
 */
export const socketSend = function<TContext, TEvent extends XState.EventObject>(
  sender: { send: (payload: Action) => void },

  transformer: (ctx: TContext, evt: TEvent) => Action
): XState.ActionFunction<TContext, TEvent> {
  return (ctx: TContext, evt: TEvent) => {
    sender.send(transformer(ctx, evt));
  };
};

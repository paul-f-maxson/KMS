import * as XState from 'xstate';

export const emit = function<TContext, TEvent extends XState.EventObject>(
  io: SocketIO.Socket,
  eventType: string,
  transformer: (ctx: TContext, evt: TEvent) => object
): XState.ActionFunction<TContext, TEvent> {
  return (ctx: TContext, evt: TEvent) =>
    io.emit(eventType, transformer(ctx, evt));
};

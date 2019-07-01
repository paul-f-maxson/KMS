const R = require('ramda');
module.exports = {
  emit: R.curry((io, eventType, transformer) => (ctx, evt) =>
    io.emit(eventType, transformer(ctx, evt))
  ),
};

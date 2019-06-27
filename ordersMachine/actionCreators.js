module.exports = io => ({
  emitOverSocket: (type, makeData) => (ctx, evt) =>
    io.emit(type, makeData(ctx, evt)),
});

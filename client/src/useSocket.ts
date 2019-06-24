import { useState, useEffect } from 'react';

export default (socket: SocketIOClient.Emitter, defaultData: any) => {
  const [data, setData] = useState(defaultData);
  // OPTIMIZE: useEffect
  socket.on('update', setData);
  return data;
};

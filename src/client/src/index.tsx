import React from 'react';
import ReactDOM from 'react-dom';
import SocketIOClient from 'socket.io-client';

import App from './components/App';

// import App from './components/MockApp';

import * as serviceWorker from './serviceWorker';

import 'typeface-roboto';

const socket = SocketIOClient.connect('/');

export const SocketRootContext = React.createContext(socket);

ReactDOM.render(
  <SocketRootContext.Provider value={socket}>
    <App />
  </SocketRootContext.Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

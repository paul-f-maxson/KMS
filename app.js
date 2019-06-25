const express = require('express');
const { Server } = require('http');
const socketIO = require('socket.io');
const path = require('path');
const { interpret } = require('xstate');

const ordersMachine = require('./ordersMachine');

const app = express();
const server = Server(app);
const socket = socketIO(server);

// Initialize the FSM interpretation service
app.locals.ordersService = interpret(ordersMachine).start();

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// Parsing application/json from the body
app.use(express.json());

// TODO: Move API to separate directory
// Add API endpoint
app.post('/add', (req, res) => {
  if (req.body) {
    req.app.locals.ordersService.send({ type: 'ADD', order: req.body.order });
    res.status(200).end();
  } else {
    res.status(400).send('Request must have a body');
  }
  res.end();
});

// Handles any GET request by sending the React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

socket.on('connection', sct => {
  console.log(`socket ${sct.id} connected`);

  // Transmit updates to machine context over the socket
  const updateHandler = context => {
    sct.emit('update', context.orders);
  };
  app.locals.ordersService.onChange(updateHandler);

  sct.on('disconnect', () => {
    console.log(`socket ${sct.id} disconnected`);
    // Cleanup: stop sending if client disconnects
    app.locals.ordersService.off(updateHandler);
  });
});

const port = process.env.PORT || 5001;

server.listen(port, () => console.log('app is listening on port ' + port));

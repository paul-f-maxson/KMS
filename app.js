const express = require('express');
const { Server } = require('http');

const path = require('path');
const { interpret } = require('xstate');

// Routers
const apiRouter = require('./routes/api');

const app = express();
const server = Server(app);
const io = require('socket.io')(server);

const ordersMachine = require('./ordersMachine')(io);

// logging
io.on('connection', socket => {
  console.log(`socket ${socket.id} connected`);

  socket.on('disconnect', () => {
    console.log(`socket ${socket.id} disconnected`);
  });
});

// Initialize the FSM interpretation service
app.locals.ordersService = interpret(ordersMachine).start();

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// Parse application/json from the body
app.use(express.json());

// Direct api calls to api router
app.use('/api', apiRouter);

// Handles any GET request by sending the React app
// app.all('*', (req, res) => {
//   res.sendFile(path.join(__dirname + '/client/build/index.html'));
// });

const port = process.env.PORT || 5001;

server.listen(port, () => console.log('app is listening on port ' + port));

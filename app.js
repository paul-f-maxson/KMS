const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const axios = require('axios');
const path = require('path');

const index = require('./routes/index');

const app = express();

// Create the socket.io server
const server = http.createServer(app);
const io = socketIo(server);

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// Handles any request by sending the React App
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);

const express = require('express');

const app = express();

const server = require('http').Server(app);
const io = require('socket.io')(server);
const path = require('path');

const port = process.env.PORT || 5001;
server.listen(port, () => console.log('App is listening on port ' + port));

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// Handles any request by sending the React App
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

io.on('connection', socket => {
  console.log('connection');

  socket.emit('update', [
    { table: 100, meals: [{ seat: 1, dish: 'apples' }] },
    {
      table: 200,
      meals: [{ seat: 1, dish: 'apples' }, { seat: 3, dish: 'oranges' }],
    },
    {
      table: 710,
      meals: [{ seat: 2, dish: 'grapes' }, { seat: 4, dish: 'bananas' }],
    },
  ]);

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

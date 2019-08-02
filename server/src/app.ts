require('dotenv').config();

import debug from 'debug';
const log = debug('kms:server:log');

const express = require('express');
const { Server } = require('http');
const path = require('path');

import { interpret } from 'xstate';
import * as SocketIO from 'socket.io';

// Routers
const apiRouter = require('./routes/api');

import makeOrdersMachine from './ordersMachine';
import { OrdersContext, OrdersStateSchema, OrdersEvent } from 'kms-types';

const app = express();
const server = Server(app);

const io = SocketIO(server);

// Initialize the FSM interpretation service, passing the root socket namespace
app.locals.ordersService = interpret<
  OrdersContext,
  OrdersStateSchema,
  OrdersEvent
>(makeOrdersMachine(io)).start();

// Serve the React app
app.use(express.static(path.join(__dirname, 'client')));

// Direct api calls to api router
app.use('/api', apiRouter);

const port = process.env.PORT || 5001;

server.listen(port, () => log(`app is listening on port ${port}`));

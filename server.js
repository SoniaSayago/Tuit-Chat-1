import express from 'express';
import * as http from 'http';
import next from 'next';
// import { Server } from 'socket.io';
const socketIO = require('socket.io');

import InMemorySessionStore from './lib/sessionStore';

const port = parseInt(process.env.PORT || '3000', 10);
const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const nextHandler = nextApp.getRequestHandler();

const sessionStore = new InMemorySessionStore();

nextApp.prepare().then(async () => {
  const app = express();
  const server = http.createServer(app);
  const io = socketIO(server);

  // app.get('/hello', async (_, res) => {
  //   res.send('Hello World');
  // });

  app.use(express.json());

  io.configure(function () {
    io.set('transports', ['xhr-polling']);
    io.set('polling duration', 10);
  });

  io.use((socket, next) => {
    const sessionID = socket.handshake.auth.sessionID;
    const name = socket.handshake.auth.name;
    const ID = socket.handshake.auth.ID;

    if (sessionID) {
      const session = sessionStore.findSession(sessionID);

      if (session) {
        socket.sessionID = sessionID;
        socket.ID = session.ID;
        socket.name = session.name;
        return next();
      }
    }

    if (!name) {
      return next(new Error('invalid username'));
    }

    // create new session
    socket.sessionID = ID;
    socket.ID = ID;
    socket.name = name;
    next();
  });

  io.on('connection', (socket) => {
    // persist session
    sessionStore.saveSession(socket.sessionID, {
      ID: socket.ID,
      name: socket.name,
      connected: true,
    });

    // emit session details
    socket.emit('session', {
      sessionID: socket.sessionID,
      name: socket.name,
      ID: socket.ID,
    });

    // make the Socket instance join the associated room
    // join the "userID" room
    socket.join(socket.ID);
    // socket.join('ckud67qq400000s95fv33xngb');

    // fetch existing users
    const users = [];
    sessionStore.findAllSessions().forEach((session) => {
      users.push({
        ID: session.ID,
        name: session.name,
        connected: session.connected,
      });
    });

    socket.emit('users', users);
    // const mapSockets = io.of('/').sockets;
    // mapSockets.forEach((value, key) => {
    //   users.push({
    //     userID: key,
    //     username: value.username,
    //   });
    // });

    socket.on('join room', (room) => {
      socket.join(room);
    });

    // notify existing users
    // emit to all connected clients, except the socket itself.
    socket.broadcast.emit('user connected', {
      ID: socket.ID,
      name: socket.name,
      connected: true,
    });

    socket.on('create room', ({ name }) => {
      socket.emit('new room', { name });
    });

    // Para los rooms
    socket.on('send message', ({ message, to, author, createdAt }) => {
      socket.to(to).emit('new message', {
        message,
        author,
        createdAt,
        to,
      });
    });

    // forward the private message to the right recipient
    socket.on('private message', ({ message, author, createdAt, to }) => {
      // broadcast in both the recipient and the sender
      socket.to(to).to(socket.ID).emit('private message', {
        message,
        author,
        createdAt,
        from: socket.ID,
        to,
      });
    });

    // notify users upon disconnection
    socket.on('disconnect', async () => {
      // returns a Set containing the ID of all Socket instances that are in the given room
      const matchingSockets = await io.in(socket.ID).allSockets();
      const isDisconnected = matchingSockets.size === 0;

      if (isDisconnected) {
        // notify other users
        socket.broadcast.emit('user disconnected', socket.ID);
        // update the connection status of the session
        sessionStore.saveSession(socket.sessionID, {
          ID: socket.ID,
          name: socket.name,
          connected: false,
        });
      }
    });
  });

  app.all('*', (req, res) => nextHandler(req, res));

  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
});

import { io } from 'socket.io-client';

const URL = 'http://localhost:8080';

// the connection is not established right away
const socket = io(URL, { autoConnect: false });

// catch-all listener
socket.onAny((event, ...args) => {
  console.log(event, args);
});

export default socket;

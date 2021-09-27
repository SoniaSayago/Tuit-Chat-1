import { io } from 'socket.io-client';

const URL = process.env.BASE_URL;
const socket = io(URL, {
  path: '/api/socketio',
  autoConnect: false,
});

socket.onAny((event, ...args) => {
  console.log(event, args);
});

export default socket;

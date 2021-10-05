import { io } from 'socket.io-client';

const URL = process.env.NEXT_PUBLIC_VERCEL_URL;
console.log('--------------------------------------------');
console.log(URL);
const socket = io(URL, {
  path: '/api/socketio',
});

socket.onAny((event, ...args) => {
  console.log(event, args);
});

export default socket;

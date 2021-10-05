import { io } from 'socket.io-client';

const URL = process.env.NEXT_PUBLIC_VERCEL_URL;
console.log('--------------------------------------------');
console.log('http://localhost:3000');
const socket = io('http://localhost:3000', {
  path: '/api/socketio',
});

socket.onAny((event, ...args) => {
  console.log(event, args);
});

export default socket;

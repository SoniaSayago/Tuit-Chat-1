import { io } from 'socket.io-client';

const URL = process.env.BASE_URL;
console.log('--------------------------------------------');
console.log('https://tuit-chat-dvullgmja-apenaranda031-misenaeduc.vercel.app/');
const socket = io('https://tuit-chat-dvullgmja-apenaranda031-misenaeduc.vercel.app', {
  path: '/api/socketio',
  autoConnect: false,
});

socket.onAny((event, ...args) => {
  console.log(event, args);
});

export default socket;

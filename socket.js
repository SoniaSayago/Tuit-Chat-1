import { io } from 'socket.io-client';

const URL = 'https://tuit-chat-dvullgmja-apenaranda031-misenaeduc.vercel.app';
console.log('--------------------------------------------');
console.log('https://tuit-chat-dvullgmja-apenaranda031-misenaeduc.vercel.app/');
const socket = io(URL, {
  path: '/api/socketio',
  autoConnect: false,
});

socket.onAny((event, ...args) => {
  console.log(event, args);
});

export default socket;

import io from 'socket.io-client';
import baseUrl from './utils/bseUrls'

const socket = io(baseUrl, {
  path: '/api/socketio',
  autoConnect: false,
});

socket.onAny((event, ...args) => {
  console.log(event, args);
});

export default socket;

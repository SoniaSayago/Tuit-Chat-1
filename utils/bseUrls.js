const baseUrl =
  process.env.NODE_ENV !== 'production'
    ? 'http://localhost:3000'
    : 'https://tuit-chat.herokuapp.com/';

export default baseUrl;

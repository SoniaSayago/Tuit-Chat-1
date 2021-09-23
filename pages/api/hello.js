// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// import fetch from 'isomorphic-fetch';

export default function handler(req, res) {
  res.status(200).json({ name: 'John Doe' })
}

// handler.getInitialProps = async () => {
//   const res = await fetch('https://slack-chats.herokuapp.com/');
//   const data = await res.json();
//   console.log(data);
//   return { users: data };
// }

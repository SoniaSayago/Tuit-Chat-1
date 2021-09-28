// import { getSession } from 'next-auth/client';
// import Router from 'next/router';

// // eslint-disable-next-line import/no-anonymous-default-export
// export default async (req, res) => {
//   const session = await getSession({ req });

//   if (session) {
//     console.log('La sesión desde api/session');
//     console.log(session);

//     res.send({
//       content: 'Welcome to our secret page',
//     });
//   } else {
//     res.end();
//     Router.replace('/');
//   }
// };

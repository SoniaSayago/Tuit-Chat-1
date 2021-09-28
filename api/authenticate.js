// import fetch from 'isomorphic-unfetch';
// import Router from 'next/router';

// export default async function auth(url, ctx) {
//   const cookie = ctx.req?.headers.cookie;

//   const resp = await fetch(url, {
//     headers: {
//       cookie: cookie,
//     },
//   });

//   if (resp.status === 401 && !context.req) {
//     Router.replace('/login');
//     return {};
//   }

//   if (resp.status === 401 && context.req) {
//     context.res?.writeHead(302, {
//       Location: 'http://localhost:3000/',
//     });
//     context.res?.end();
//     return;
//   }

//   const json = await resp.json();
//   console.log(json);
//   return json;
// }

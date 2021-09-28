// import db from '../../lib/database';

// export default async function getUsers(req, res) {
//   db('SELECT id, name, email FROM users', [])
//     .then((response) => {
//       console.log(response.rows);
//       res.status(200).json(response.rows);
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json({ message: 'Something went wrong' });
//     });
// }

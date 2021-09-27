import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import cookie from 'cookie';

import db from '../../lib/database';

export default async function login(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Enter email and password' });
    }

    try {
      const response = await db('SELECT * FROM users WHERE email=$1', [email]);

      if (!response.rows.length) {
        return res.status(400).json({
          message: 'User Not Exist',
        });
      }

      compare(password, response.rows[0].password, (err, data) => {
        // if error then throw error
        if (err) throw err;
        // if both match then you can do anything
        else if (!data) {
          return res.status(400).json({
            message: 'Ups, something went wrong!',
          });
        }

        const claims = {
          sub: response.rows[0].id,
          email: response.rows[0].email,
          name: response.rows[0].name,
        };
        const jwt = sign(claims, process.env.JWT_SECRET, { expiresIn: 3600 });

        // const cookieOptions = {
        //   // expires: new Date(Date.now() + 900000),
        //   httpOnly: process.env.NODE_ENV !== 'development',
        //   secure: process.env.NODE_ENV !== 'development',
        //   maxAge: 3600,
        // };

        // res.cookie('auth', jwt, cookieOptions);

        res.setHeader(
          'Set-Cookie',
          cookie.serialize('auth', jwt, {
            httpOnly: process.env.NODE_ENV !== 'development',
            secure: process.env.NODE_ENV !== 'development',
            sameSite: 'strict',
            maxAge: 3600,
            path: '/',
          })
        );

        res.status(200).json(claims);
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Something went wrong' });
    }
  } else {
    res.status(405).json({ message: 'We only support POST' });
  }
}

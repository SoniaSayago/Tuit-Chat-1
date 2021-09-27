import db from '../../../lib/database';
import bcrypt from 'bcrypt';

export default async function signup(req, res) {
  if (req.method === 'POST') {
    try {
      const { name, email, password } = req.body;

      const salt = await bcrypt.genSalt(10);
      const passwordEncrypted = await bcrypt.hash(password, salt);

      const response = await db(
        'INSERT INTO users(name, email, password) VALUES($1, $2, $3) RETURNING *',
        [name, email, passwordEncrypted]
      );

      res.status(201).json(response.rows);
    } catch (error) {
      res.status(500).json({ message: 'Something went wrong' });
    }
  } else {
    res.status(405).json({ message: 'We only support POST' });
  }
}

import prisma from '../../lib/database';
import bcrypt from 'bcrypt';

export default async function signup(req, res) {
  if (req.method === 'POST') {
    try {
      const { name, email, password } = req.body;

      const salt = await bcrypt.genSalt(10);
      const passwordEncrypted = await bcrypt.hash(password, salt);

      const resp = await prisma.user.create({
        data: {
          name,
          email,
          password: passwordEncrypted,
          UserToRooms: {
            create: {
              room: {
                connect: {
                  id: 'ckuoazouo0000pcwrmgwvep9a',
                },
              },
            },
          },
        },
      });

      res.status(201).json(resp);
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: 'Something went wrong' });
    }
  } else {
    res.status(405).json({ message: 'We only support POST' });
  }
}

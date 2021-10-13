import prisma from '../../../lib/database';

export default async function signup(req, res) {
  if (req.method === 'POST') {
    try {
      const { name } = req.body;

      const resp = await prisma.room.create({
        data: {
          name,
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

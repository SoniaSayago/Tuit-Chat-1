import prisma from '../../../lib/database';

export default async function roomsHandler(req, res) {
  if (req.method === 'GET') {
    try {
      const resp = await prisma.room.findMany({
        select: {
          id: true,
          name: true,
          messages: {
            select: {
              author: true,
              message: true,
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
    res.status(405).json({ message: 'We only support GET' });
  }
}

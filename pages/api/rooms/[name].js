import prisma from '../../../lib/database';

export default async function conversationHandler(req, res) {
  const {
    query: { name },
    method,
  } = req;

  switch (method) {
    case 'GET':
      // Get data from your database
      const room = await prisma.room.findFirst({
        where: {
          OR: [{ name: name }, { id: name }],
        },
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

      res.status(200).json({ ...room });
      break;
    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

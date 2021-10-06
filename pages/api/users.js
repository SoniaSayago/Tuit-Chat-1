import prisma from '../../lib/database';

export default async function conversationHandler(req, res) {
  switch (method) {
    case 'GET':
      // Get data from your database
      const conversations = await prisma.user.findMany({
        where: {
          OR: [{ userOneId: id }, { userTwoId: id }],
        },
      });

      res.status(200).json(conversations);
      break;
    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

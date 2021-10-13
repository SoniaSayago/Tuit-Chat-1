import prisma from '../../../lib/database';

export default async function conversationHandler(req, res) {
  const { method } = req;

  switch (method) {
    case 'POST':
      const { authorId, userTo } = req.body;

      const newConversation = await prisma.conversation.create({
        data: {
          userOne: {
            connect: {
              id: authorId,
            },
          },
          userTwo: {
            connect: {
              id: userTo,
            },
          },
        },
      });

      res.status(200).json(newConversation);
      break;
    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

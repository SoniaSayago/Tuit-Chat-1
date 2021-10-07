import prisma from '../../../lib/database';

export default async function messageHandler(req, res) {
  const { method } = req;

  switch (method) {
    case 'POST':
      const { authorId, message, conversationId } = req.body;

      const newMessage = await prisma.message.create({
        data: {
          message: message,
          author: {
            connect: {
              id: authorId,
            },
          },
          conversation: {
            connect: {
              id: conversationId,
            },
          },
        },
      });

      res.status(200).json(newMessage);
      break;
    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

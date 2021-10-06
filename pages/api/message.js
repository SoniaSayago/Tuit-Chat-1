import prisma from '../../lib/database';

export default async function messageHandler(req, res) {
  switch (method) {
    case 'POST':
      const { userOne, userTwo } = req.body;

      const newMessage = await prisma.message.create({
        data: {
          userOne: {
            connect: { id: userOne },
          },
          userTwo: {
            connect: { id: userTwo },
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

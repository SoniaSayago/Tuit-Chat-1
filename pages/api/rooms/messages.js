import prisma from '../../../lib/database';

export default async function messageRoomHandler(req, res) {
  const { method } = req;

  switch (method) {
    case 'POST':
      const { author, message, room } = req.body;

      const newMessage = await prisma.messageRoom.create({
        data: {
          message: message,
          author: author,
          room: {
            connect: {
              id: room,
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

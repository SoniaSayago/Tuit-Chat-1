import prisma from '../../../lib/database';

export default async function joinRoomHandler(req, res) {
  const { method } = req;

  switch (method) {
    case 'POST':
      const { user, room } = req.body;

      const newJoin = await prisma.userToRooms.create({
        data: {
          user: {
            connect: {
              id: user,
            },
          },
          room: {
            connect: {
              id: room,
            },
          },
        },
      });

      res.status(200).json(newJoin);
      break;
    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

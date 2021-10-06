import prisma from '../../../lib/database';

export default async function userHandler(req, res) {
  const {
    query: { id },
    method,
  } = req;

  switch (method) {
    case 'GET':
      // Get data from your database
      const user = await prisma.user.findUnique({
        where: {
          id,
        },
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
          UserToRooms: {
            select: {
              room: true,
            },
          },
          userOne: {
            select: {
              userTwo: {
                select: {
                  id: true,
                  name: true,
                },
              },
              messages: {
                select: {
                  message: true,
                  author: {
                    select: {
                      name: true,
                    },
                  },
                  createdAt: true,
                },
              },
            },
          },
          userTwo: {
            select: {
              userTwo: {
                select: {
                  id: true,
                  name: true,
                },
              },
              messages: {
                select: {
                  message: true,
                  author: {
                    select: {
                      name: true,
                    },
                  },
                  createdAt: true,
                },
              },
            },
          },
        },
      });

      res.status(200).json(user);
      break;
    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

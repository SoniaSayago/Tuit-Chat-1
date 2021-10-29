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
          password: true,
          isActive: true,
          UserToRooms: {
            select: {
              room: {
                select: {
                  id: true,
                  name: true,
                  // messages: {
                  //   select: {
                  //     author: true,
                  //     message: true,
                  //     createdAt: true,
                  //   },
                  // },
                },
              },
            },
          },
          userOne: {
            select: {
              id: true,
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
                      image: true,
                    },
                  },
                  createdAt: true,
                },
              },
            },
          },
          userTwo: {
            select: {
              id: true,
              userOne: {
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
                      image: true,
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

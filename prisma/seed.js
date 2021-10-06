const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // const general = await prisma.room.create({
  //   data: {
  //     name: 'General',
  //   },
  // });
  // const newConversation = await prisma.conversation.create({
  //   data: {
  //     userOne: {
  //       connect: { id: 'ckueoeisb0000j095mz06rb48' },
  //     },
  //     userTwo: {
  //       connect: { id: 'ckuer5my60000c095olfmhvgw' },
  //     },
  //   },
  // });
  // const newMessage = await prisma.message.create({
  //   data: {
  //     message: 'Holaaa ben',
  //     author: {
  //       connect: {
  //         id: 'ckueoeisb0000j095mz06rb48',
  //       },
  //     },
  //     conversation: {
  //       connect: {
  //         id: 'ckuer90740007hw9535bolvk1',
  //       },
  //     },
  //   },
  // });
  // console.log({ newMessage });
  const user = await prisma.user.findFirst({
    where: {
      email: 'an@ej.co',
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
          room: true,
        },
      },
      userOne: true,
      userTwo: {
        select: {
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
                },
              },
              createdAt: true,
            },
          },
        },
      },
    },
  });

  console.log(user);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

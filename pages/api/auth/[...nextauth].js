import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { compare } from 'bcrypt';
import prisma from '../../../lib/database';

let userAccount = null;

const options = {
  adapter: PrismaAdapter(prisma),
  cookie: {
    secure: process.env.NODE_ENV && process.env.NODE_ENV === 'production',
  },
  redirect: false,
  session: {
    jwt: true,
    maxAge: 3600,
  },
  providers: [
    Credentials({
      id: 'credentials',
      name: 'Login',
      // credentials: {
      //   username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
      //   password: { label: 'Password', type: 'password' },
      // },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        const user = await prisma.user.findFirst({
          where: {
            email: credentials.email,
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
                      },
                    },
                    createdAt: true,
                  },
                },
              },
            },
          },
        });

        if (!user) throw new Error('Please sign up');

        const checkPassword = await compare(credentials.password, user.password);

        if (!checkPassword) {
          throw new Error('Invalid credentialss');
        }

        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          const { password, ...userInfo } = user;
          userAccount = userInfo;
          return userInfo;
        } else {
          // If you return null or false then the credentials will be rejected
          return null;
          // You can also Reject this callback with an Error or with a URL:
          // throw new Error('error message') // Redirect to error page
          // throw '/path/to/redirect'        // Redirect to a URL
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (typeof user.id !== typeof undefined) {
        if (user.isActive === '1') {
          return user;
        } else {
          return false;
        }
      } else {
        return false;
      }
    },
    async session({ session, user, token }) {
      if (userAccount !== null) {
        session.user = userAccount;
      } else if (
        typeof token.user !== typeof undefined &&
        (typeof session.user === typeof undefined ||
          (typeof session.user !== typeof undefined &&
            typeof session.user.id === typeof undefined))
      ) {
        session.user = token.user;
      } else if (typeof token !== typeof undefined) {
        session.token = token;
      }
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      if (typeof user !== typeof undefined) {
        token.user = user;
      }
      return token;
    },
  },
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (req, res) => NextAuth(req, res, options);

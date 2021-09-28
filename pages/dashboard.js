import socket from '../socket';
import { useEffect, useState } from 'react';
import ContactPanel from '../components/ContactPanel';
import MessagePanel from '../components/MessagePanel';
import styled from 'styled-components';
import { useSession, getSession } from 'next-auth/react';

const ContDashboard = styled.div`
  display: flex;
  height: 100vh;
`;

export default function Dashboard() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const { data: session, status } = useSession();
  console.log('-------------------------------------');
  console.log(session);

  // const fetchData = async () => {
  //   const res = await fetch('/api/secret');
  //   const json = await res.json();

  //   if (json.content) setContent(json.content);
  // };

  useEffect(() => {
    // fetchData();
    console.log('Session de la linea 20 en dashboard');
    console.log(session);

    const sessionID = localStorage.getItem('sessionID');

    if (sessionID) {
      socket.auth = { sessionID };
    } else {
      socket.auth = { username: session.user.name, userID: session.user.id };
    }

    socket.connect();

    socket.on('session', ({ sessionID, userID }) => {
      // attach the session ID to the next reconnection attempts
      socket.auth = { sessionID };
      // store it in the localStorage
      localStorage.setItem('sessionID', sessionID);
      // save the ID of the user
      socket.userID = userID;
    });

    socket.on('connect', () => {
      const usersUpdated = users.map((user) => {
        if (user.self) user.connected = true;

        return user;
      });

      setUsers(usersUpdated);
    });

    socket.on('disconnect', () => {
      const usersUpdated = users.map((user) => {
        if (user.self) user.connected = false;

        return user;
      });

      setUsers(usersUpdated);
    });

    socket.on('users', (allUsers) => {
      allUsers.forEach((user) => {
        const updatedUsers = users.map((single) => {
          if (single.userID === user.userID) {
            single.connected = user.connected;
          }
          return single;
        });

        setUsers(updatedUsers);
        user.self = user.userID === socket.userID;
        initReactiveProperties(user);
      });
      // put the current user first, and then sort by username
      allUsers.sort((a, b) => {
        if (a.self) return -1;
        if (b.self) return 1;
        if (a.username < b.username) return -1;
        return a.username > b.username ? 1 : 0;
      });

      setUsers(allUsers);
    });

    socket.on('user connected', (user) => {
      let isUser = false;
      const updatedUser = users.map((single) => {
        if (single.userID === user.userID) {
          single.connected = true;
          isUser = true;
        }
        return single;
      });

      setUsers(updatedUser);

      if (!isUser) {
        initReactiveProperties(user);
        users.push(user);
        setUsers([...users]);
      }
    });

    socket.on('user disconnected', (id) => {
      const updated = users.map((user) => {
        if (user.userID === id) user.connected = false;
        return user;
      });

      setUsers([...updated]);
    });

    socket.on('private message', ({ content, from, to }) => {
      const updatedObject = users.map((user) => {
        console.log('///////////////////////////');
        console.log(user);
        const fromSelf = socket.userID === from;
        if (user.userID === (fromSelf ? to : from)) {
          if (user.userID === selectedUser.userID) {
            user.messages = [...selectedUser.messages];
          }
          user.messages.push({ content, fromSelf });
        }

        if (user.userID !== selectedUser.userID) {
          user.hasNewMessages = true;
        } else {
          setSelectedUser(user);
        }

        return user;
      });

      setUsers(updatedObject);
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('users');
      socket.off('user connected');
      socket.off('user disconnected');
      socket.off('private message');
    };
  }, [session]);

  const initReactiveProperties = (user) => {
    user.messages = [];
    user.hasNewMessages = false;
  };

  const handleSelectUser = (user) => {
    setSelectedUser(user);
    user.hasNewMessages = false;
  };

  const handleMessage = (content) => {
    if (selectedUser) {
      socket.emit('private message', {
        content,
        to: selectedUser.userID,
      });

      const newMessage = { content, fromSelf: true };
      const user = { ...selectedUser, messages: [...selectedUser.messages, newMessage] };
      const usersUpdated = users.map((user) => {
        if (user.userID === selectedUser.userID) user.messages.push(newMessage);
        return user;
      });

      setUsers(usersUpdated);
      setSelectedUser(user);
    }
  };

  return (
    <ContDashboard>
      <ContactPanel users={users} onSelectUser={handleSelectUser} />
      <MessagePanel userSelected={selectedUser} onMessage={handleMessage} />
    </ContDashboard>
  );
}

// Dashboard.getInitialProps = async (ctx) => {
//   const user = await auth('/api/user', ctx);

//   console.log(user);
//   return { user };
// };

// export const getServerSideProps = async ({ req }) => {
//   console.log(req);
//   console.log('El de arriba es el req.')
//   const token = req.headers.AUTHORIZATION
//   const userId = await getUserId(token)
//   const posts = await prisma.post.findMany({
//     where: {
//       author: { id: userId },
//     },
//   })
//   return { props: { posts } }
// }

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  console.log('La sesión desde api/session');
  console.log(session);

  socket.auth = { username: session.user.name, userID: session.user.id };

  return {
    props: { session },
  };
}

import socket from '../../socket';
import { useEffect, useState } from 'react';
import ContactPanel from '../../components/ContactPanel';
import MessagePanel from '../../components/MessagePanel';
import styled from 'styled-components';
import { useSession, getSession } from 'next-auth/react';
import useSwr from 'swr';
import { useRouter } from 'next/router';

const ContDashboard = styled.div`
  display: flex;
  height: 100vh;
`;

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Dashboard() {
  const [myRooms, setMyRooms] = useState([
    {
      ID: 'ckud67qq400000s95fv33xngb',
      name: 'general',
      messages: [],
      isChannel: true,
      // hasNewMessages: false,
    },
  ]);

  const router = useRouter();

  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(myRooms[0]);

  const { data: session, status } = useSession();

  // const { data, error } = useSwr(`/api/users/${session.user.id}`, fetcher);
  // const { data: conversations, error: errorConversations } = useSwr(
  //   `/api/conversation/${session.user.id}`,
  //   fetcher
  // );

  // const fetchConversation = async () => {
  //   fetcher(`/api/user/${session.user.id}`).then((conversations) => {
  //     console.log(conversations);
  //     // const currentUser = session.user.id;
  //     // const users = [];

  //     // const info = (user, messages) => ({
  //     //   ID: user.id,
  //     //   name: user.name,
  //     //   connected: false,
  //     //   hasNewMessages: false,
  //     //   isChannel: false,
  //     //   messages,
  //     //   self: false,
  //     // });

  //     // const myContacts = conversations.map((chat) => {
  //     //   const {
  //     //     userOneId: { id: idOne, name: nameOne },
  //     //     userTwoId: { id: idTwo, name: nameTwo },
  //     //     messages,
  //     //   } = chat;

  //     //   return idOne === currentUser ? info() : idOne;
  //     // });
  //   });

  //   // const resp = await fetch(`/api/conversation/${session.user.id}`);

  //   // const conversations = await resp.json();

  //   // console.log(conversations);
  // };

  const conversations = (chats) => {
    const users = chats.map((chat) => {
      const prop = chat?.userOne ? 'userOne' : 'userTwo';
      return {
        ID: chat[prop].id,
        conversation: chat.id,
        name: chat[prop].name,
        messages: chat.messages,
        connected: false,
        hasNewMessages: false,
        isChannel: false,
        self: false,
      };
    });

    setUsers(users);
    console.log(chats);
    console.log('El consolelog de conversations');
    socket.connect();
  };

  useEffect(() => {
    const sessionID = localStorage.getItem('sessionID');

    if (sessionID) {
      socket.auth = { name: session.user.name, ID: session.user.id, sessionID };
    } else {
      socket.auth = { name: session.user.name, ID: session.user.id };
    }

    conversations([...session.user.userOne, ...session.user.userTwo]);

    socket.on('session', ({ sessionID, name, ID }) => {
      // attach the session ID to the next reconnection attempts
      socket.auth = { sessionID };
      // store it in the localStorage
      localStorage.setItem('sessionID', sessionID);
      // save the ID of the user
      socket.ID = ID;
      socket.name = name;
    });
  }, []);

  useEffect(() => {
    // console.log(session.user);
    // console.log('************************');

    // socket.connect();

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
      const usersUpd = [];
      allUsers.forEach((user) => {
        const found = users.find(({ ID }) => user.ID === ID);

        if (found) {
          found.connected = user.connected;
        }

        // const updatedUsers = users.map((single) => {
        //   if (single.ID === user.ID) {
        //     single.connected = user.connected;
        //   }
        //   return single;
        // });

        // setUsers([...updatedUsers]);
        user.self = user.ID === socket.ID;
        initReactiveProperties(user);

        usersUpd.push(user);
      });

      users.forEach((myChats) => {
        const found = usersUpd.find(({ ID }) => myChats.ID === ID);

        if (!found) usersUpd.push(myChats);
        else {
          found.messages = myChats.messages;
          found.conversation = myChats.conversation;
        }
      });
      // put the current user first, and then sort by username
      usersUpd.sort((a, b) => {
        if (a.self) return -1;
        if (b.self) return 1;
        if (a.name < b.name) return -1;
        return a.name > b.name ? 1 : 0;
      });

      setUsers([...usersUpd]);
    });

    socket.on('user connected', (user) => {
      let isNewUser = false;

      const updatedUser = users.map((single) => {
        if (single.ID === user.ID) {
          single.connected = true;
          isNewUser = true;
        }
        return single;
      });

      setUsers(updatedUser);

      if (!isNewUser) {
        initReactiveProperties(user);
        users.push(user);
        setUsers([...users]);
      }
    });

    socket.on('user disconnected', (id) => {
      const updated = users.map((user) => {
        if (user.ID === id) user.connected = false;
        return user;
      });

      setUsers([...updated]);
    });

    socket.on('private message', ({ message, to, from, author, createdAt }) => {
      const updatedObject = users.map((user) => {
        const fromSelf = socket.ID === from;
        if (user.ID === (fromSelf ? to : from)) {
          if (user.ID === selectedUser.ID) {
            user.messages = [...selectedUser.messages];
          }
          user.messages.push({ message, author, createdAt });
        }

        if (user.ID !== selectedUser.ID) {
          user.hasNewMessages = true;
        } else {
          setSelectedUser(user);
        }

        return user;
      });

      setUsers(updatedObject);
    });

    socket.on('new message', ({ content, sender, from, to }) => {
      const updatedObject = myRooms.map((room) => {
        if (room.ID === to) {
          const fromSelf = socket.ID === from;
          room.messages.push({ content, fromSelf, sender });
        }

        if (selectedUser.ID === room.ID) {
          setSelectedUser(room);
        }

        return room;
      });

      setMyRooms(updatedObject);
    });

    // socket.emit('join room', 1);

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('users');
      socket.off('user connected');
      socket.off('user disconnected');
      socket.off('private message');
      socket.off('new message');
    };
  }, [users]);

  const initReactiveProperties = (user) => {
    user.messages = [];
    user.hasNewMessages = false;
    user.isChannel = false;
  };

  // const initReactiveRooms

  const handleSelectUser = (user) => {
    setSelectedUser(user);
    user.hasNewMessages = false;

    router.push(user.ID);
  };

  const handleMessage = (content) => {
    if (selectedUser && !selectedUser.isChannel) {
      socket.emit('private message', {
        message: content,
        author: { name: socket.name },
        to: selectedUser.ID,
        createdAt: '2020-07-01',
      });

      const newMessage = {
        message: content,
        author: { name: socket.name },
        createdAt: '2020-07-01',
      };
      const userSelected = {
        ...selectedUser,
        messages: [...selectedUser.messages, newMessage],
      };

      const usersUpdated = users.map((user) => {
        if (user.ID === selectedUser.ID) user.messages.push(newMessage);
        return user;
      });

      setUsers(() => usersUpdated);
      setSelectedUser(userSelected);
    } else if (selectedUser) {
      socket.emit('send message', {
        content,
        to: selectedUser.ID,
      });

      const newMessage = { content, fromSelf: true };
      const roomSelected = {
        ...selectedUser,
        messages: [...selectedUser.messages, newMessage],
      };
      const roomsUpdated = myRooms.map((room) => {
        if (room.ID === selectedUser.ID) room.messages.push(newMessage);
        return room;
      });

      setMyRooms(roomsUpdated);
      setSelectedUser(roomSelected);
    }
  };

  return (
    <ContDashboard>
      <ContactPanel users={users} rooms={myRooms} onSelectUser={handleSelectUser} />
      <MessagePanel userSelected={selectedUser} onMessage={handleMessage} />
    </ContDashboard>
  );
}

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

  return {
    props: { session },
  };
}

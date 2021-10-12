import socket from '../socket';
import { useEffect, useState } from 'react';
import ContactPanel from '../src/components/ContactPanel';
import MessagePanel from '../src/components/MessagePanel';
import styled from 'styled-components';
import { useSession, getSession } from 'next-auth/react';
import baseURL from '../utils/bseUrls';

const ContDashboard = styled.div`
  display: flex;
  height: 100vh;
`;

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Dashboard() {
  const [myRooms, setMyRooms] = useState([
    {
      ID: 'ckuoazouo0000pcwrmgwvep9a',
      name: 'General',
      messages: [],
      isChannel: true,
      // hasNewMessages: false,
    },
  ]);

  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(myRooms[0]);

  const { data: session, status } = useSession();

  const conversations = (chats, allRooms, joinedRooms) => {
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

    const rooms = allRooms.map((channel) => {
      const found = joinedRooms.find(({ room }) => room.id === channel.id);

      if (found) {
        socket.emit('join room', channel.id);
      }

      return {
        ID: channel.id,
        name: channel.name,
        messages: channel.messages || [],
        isChannel: true,
        isJoined: found ? true : false,
      };
    });

    setMyRooms(rooms);
    setSelectedUser(rooms[0]);
    setUsers(users);
    socket.connect();
  };

  useEffect(() => {
    const sessionID = localStorage.getItem('sessionID');

    if (sessionID) {
      socket.auth = { name: session.user.name, ID: session.user.id, sessionID };
    } else {
      socket.auth = { name: session.user.name, ID: session.user.id };
    }

    conversations(
      [...session.user.userOne, ...session.user.userTwo],
      session.rooms,
      session.user.UserToRooms
    );

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

    socket.on('new message', ({ message, author, to, createdAt }) => {
      const updatedObject = myRooms.map((room) => {
        if (room.ID === to) {
          room.messages.push({ message, author, createdAt });
        }

        if (selectedUser.ID === room.ID) {
          setSelectedUser(room);
        }

        return room;
      });

      setMyRooms(updatedObject);
    });

    socket.on('new room', ({ name }) => {
      fetcher(`${baseURL}/api/rooms/${name}`).then((resp) => {
        const newRoom = {
          ID: resp.id,
          name: resp.name,
          messages: resp.messages || [],
          isChannel: true,
          isJoined: false,
        };

        myRooms.push(newRoom);

        setMyRooms([...myRooms]);
      });
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('users');
      socket.off('user connected');
      socket.off('user disconnected');
      socket.off('private message');
      socket.off('new message');
      socket.off('new room');
    };
  }, [users, myRooms]);

  const initReactiveProperties = (user) => {
    user.messages = [];
    user.hasNewMessages = false;
    user.isChannel = false;
  };

  // const initReactiveRooms

  const handleJoin = () => {
    fetch(`${baseURL}/api/rooms/join`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        room: selectedUser.ID,
        user: socket.ID,
      }),
    }).then(() => {
      fetcher(`${baseURL}/api/rooms/${selectedUser.ID}`).then((resp) => {
        const joined = {
          ID: resp.id,
          name: resp.name,
          messages: resp.messages || [],
          isChannel: true,
          isJoined: true,
        };

        const updated = myRooms.map((room) => {
          if (room.ID === selectedUser.ID) {
            return joined;
          } else {
            return room;
          }
        });

        setMyRooms([...updated]);
      });

      const updated = myRooms.map((room) => {
        if (room.ID === selectedUser.ID) {
          room.isJoined = true;
        }

        return room;
      });

      setMyRooms(updated);
    });
  };

  const handleSelectUser = (user) => {
    setSelectedUser(user);
    user.hasNewMessages = false;
  };

  const createRoom = (name) => {
    fetch(`${baseURL}/api/rooms/newRoom`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
      }),
    }).then(() => {
      socket.emit('create room', {
        name: name,
      });
    });
  };

  const sendMessage = (content, conversation) => {
    fetch(`${baseURL}/api/user/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        authorId: socket.ID,
        message: content,
        conversationId: selectedUser.conversation || conversation,
      }),
    })
      .then(() => {
        socket.emit('private message', {
          message: content,
          author: { name: socket.name },
          to: selectedUser.ID,
          createdAt: '2020-07-01',
        });
      })
      .catch((e) => console.log(e.message));
  };

  const handleMessage = (content) => {
    if (selectedUser && !selectedUser.isChannel) {
      if (!selectedUser.conversation) {
        fetch(`${baseURL}/api/user/newConversation`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            authorId: socket.ID,
            userTo: selectedUser.ID,
          }),
        })
          .then((response) => response.json())
          .then(({ id }) => {
            sendMessage(content, id);
          })
          .catch((e) => console.log(e.message));
      } else {
        sendMessage(content);
      }

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
      fetch(`${baseURL}/api/rooms/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          author: socket.name,
          message: content,
          room: selectedUser.ID,
        }),
      })
        .then(() => {
          socket.emit('send message', {
            message: content,
            to: selectedUser.ID,
            author: { name: socket.name },
            createdAt: '2020-07-01',
          });
        })
        .catch((e) => console.log(e.message));

      const newMessage = {
        message: content,
        author: { name: socket.name },
        createdAt: '2020-07-01',
      };

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
      <ContactPanel
        users={users}
        rooms={myRooms}
        onSelectUser={handleSelectUser}
        onCreateRoom={createRoom}
      />
      <MessagePanel
        userSelected={selectedUser}
        onMessage={handleMessage}
        onHandleJoin={handleJoin}
      />
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
  } else {
    const resp = await fetch(`${baseURL}/api/user/${session.user.id}`);
    const user = await resp.json();

    const allRooms = await fetch(`${baseURL}/api/rooms/allRooms`);
    const rooms = await allRooms.json();

    return {
      props: { session: { user, rooms } },
    };
  }
}

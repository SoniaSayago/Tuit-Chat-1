import { ContDashboard } from './styles';
import socket from '../socket';
import { useEffect, useState } from 'react';
import ContactPanel from '../components/ContactPanel';
import MessagePanel from '../components/MessagePanel';

export default function Dashboard() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const sessionID = localStorage.getItem('sessionID');

    if (sessionID) {
      socket.auth = { sessionID };
      socket.connect();
    } else {
      Router.replace('/');
    }

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
      const updatedUser = users.map((single) => {
        if (single.userID === user.userID) single.connected = true;
        return single;
      });

      setUsers(updatedUser);

      initReactiveProperties(user);
      users.push(user);
      setUsers([...users]);
    });

    socket.on('user disconnected', (id) => {
      users.map((user) => {
        if (user.userID === id) user.connected = false;
        return user;
      });
    });

    socket.on('private message', ({ content, from }) => {
      const updatedObject = users.map((user) => {
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
  });

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

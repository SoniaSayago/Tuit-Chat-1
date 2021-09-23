import { ContDashboard } from './styles';
import socket from '../socket';
import { useEffect, useState } from 'react';
import ContactPanel from '../components/ContactPanel';
import MessagePanel from '../components/MessagePanel';

export default function Dashboard() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    socket.connect();

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

    socket.on('users', (users) => {
      users.forEach((user) => {
        user.self = user.userID === socket.id;
        initReactiveProperties(user);
      });
      // put the current user first, and then sort by username
      users.sort((a, b) => {
        if (a.self) return -1;
        if (b.self) return 1;
        if (a.username < b.username) return -1;
        return a.username > b.username ? 1 : 0;
      });

      setUsers(users);
    });

    socket.on('user connected', (user) => {
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
        if (user.userID === from) {
          if (user.userID === selectedUser.userID) {
            user.messages = [...selectedUser.messages];
          }
          user.messages.push({ content, fromSelf: false });
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
    user.connected = true;
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

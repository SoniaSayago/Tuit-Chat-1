import ContactList from './ContactList';
import Image from 'next/image';
import logo from '../../public/assets/logo.svg';
import styled from 'styled-components';
import { signOut } from 'next-auth/react';

const Container = styled.section`
  width: 260px;
  padding: 25px;
  color: white;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export default function ContactPanel({ users, rooms, onSelectUser }) {
  const logOut = () => {
    localStorage.removeItem('sessionID');
    signOut;
  };

  return (
    <Container className="bg-purple-600">
      <div>
        <Image src={logo} alt="logo" width={200} height={100} />
        <p className="text-center mt-0">Share | Connect | Enjoy</p>

        <ContactList category="Channels" list={rooms} onSelectUser={onSelectUser} />
        <ContactList
          category="Direct messages"
          list={users}
          onSelectUser={onSelectUser}
        />
      </div>
      <button onClick={logOut}>Cerrar sesión</button>
    </Container>
  );
}

import ContactList from './ContactList';
import Image from 'next/image';
import logo from '../../public/assets/logo.svg';
import styled from 'styled-components';

const Container = styled.section`
  width: 260px;
  padding: 25px;
  color: white;
`;

export default function ContactPanel({ users, onSelectUser }) {
  return (
    <Container className="bg-purple-600">
      <Image src={logo} alt="logo" width={200} height={100} />
      <p className="text-center mt-0">Share | Connect | Enjoy</p>

      {/* <ContactList category="Channels" /> */}
      <ContactList category="Direct messages" list={users} onSelectUser={onSelectUser} />
    </Container>
  );
}

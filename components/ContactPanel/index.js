import ContactList from './ContactList';

import { Container } from './styles';

function ContactPanel() {
  return (
    <Container>
      <h1>Tuit</h1>
      <p>Share | Connect | Enjoy</p>

      <ContactList category="Channels" />
      <ContactList category="Direct messages" />
    </Container>
  );
}

export default ContactPanel;

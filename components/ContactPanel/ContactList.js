import { Detail } from './styles';

function ContactList({ category }) {
  return (
    <Detail>
      <summary>{category}</summary>
      <p>Name 1</p>
      <p>Name 2</p>
      <p>Name 3</p>
    </Detail>
  );
}

export default ContactList;

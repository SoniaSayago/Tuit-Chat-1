import { Detail } from './styles';

function ContactList({ category }) {
  return (
    <Detail open>
      <summary>{category}</summary>
      <p className="hover:bg-purple-400">Name 1</p>
      <p className="hover:bg-purple-400">Name 2</p>
      <p className="hover:bg-purple-400">Name 3</p>
    </Detail>
  );
}

export default ContactList;

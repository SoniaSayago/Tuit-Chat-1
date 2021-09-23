import { Detail } from './styles';

function ContactList({ category, list, onSelectUser }) {
  return (
    <Detail open>
      <summary>{category}</summary>
      {list.map((element, index) => (
        <p
          key={index}
          onClick={() => onSelectUser(element)}
          className="hover:bg-purple-400"
        >
          <span className={element.connected ? 'text-green-600' : 'text-gray-600'}>
            &#8226;
          </span>
          {element.username}
        </p>
      ))}
    </Detail>
  );
}

export default ContactList;

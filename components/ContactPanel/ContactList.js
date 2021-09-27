import styled from 'styled-components';

const Detail = styled.details`
  margin-top: 30px;
  & summary {
    font-weight: bold;
    font-size: 1.2rem;
    margin-bottom: 10px;
  }
  & p {
    margin: 0;
    padding: 10px 0 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    position: relative;
  }

  & p span::after {
    content: '';
    position: absolute;
    background-color: rgb(164, 226, 19);
    border-radius: 50%;
    top: 17px;
    left: 8px;
    width: 10px;
    height: 10px;
  }
`;

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
          <span
            className={element.connected ? 'text-green-600 mr-2' : 'text-gray-600 mr-2'}
          ></span>
          {element.username}
        </p>
      ))}
    </Detail>
  );
}

export default ContactList;

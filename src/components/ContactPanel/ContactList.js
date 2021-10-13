import styled from 'styled-components';
import { useState } from 'react';

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
`;

const Connected = styled.span`
  ::after {
    content: '';
    position: absolute;
    background-color: ${({ connected }) => (connected ? 'rgb(164, 226, 19)' : 'none')};
    border: ${({ connected }) => (connected ? 'none' : '2px solid rgb(196, 196, 196)')};
    border-radius: 50%;
    top: 17px;
    left: 8px;
    width: 10px;
    height: 10px;
  }
`;

const Summary = styled.summary`
  & div {
    display: flex;
    justify-content: space-between;
  }
`;

const Input = styled.input`
   {
    color: #000;
    border-radius: 5px;
    padding: 3px 9px;
    font-size: 0.8rem;
    width: 100%;
  }
`;

function ContactList({ category, list, onSelectUser, onCreateRoom }) {
  const [content, setContent] = useState('');
  const [showPlus, setShowPlus] = useState(false);

  const onChangeContent = (event) => {
    if (event.key === 'Enter') {
      onCreateRoom(content);
      setShowPlus(false);
    } else {
      setContent(event.target.value);
    }
  };

  const onClickPlus = () => {
    setShowPlus(!showPlus);
  };

  return (
    <Detail open>
      <Summary>
        <div>
          {category}
          {category === 'Channels' && <span onClick={onClickPlus}>+</span>}
        </div>
        {category === 'Channels' && showPlus && (
          <Input type="text" name="new-room" onKeyDown={onChangeContent} />
        )}
      </Summary>
      {list.map((element, index) => (
        <p
          key={index}
          onClick={() => onSelectUser(element)}
          className="hover:bg-purple-400"
        >
          {!element.isChannel && (
            <Connected className="mr-2" connected={element.connected}></Connected>
          )}
          {element.name}
        </p>
      ))}
    </Detail>
  );
}

export default ContactList;

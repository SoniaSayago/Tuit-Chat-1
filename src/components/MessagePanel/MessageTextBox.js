import { useState } from 'react';
import InputEmoji from 'react-input-emoji';
import styled from 'styled-components';

const FormTextArea = styled.form`
  width: 100%;
  margin-top: 20px;

  & textarea {
    width: 100%;
    border-radius: 5px;
    padding: 10px 12px;
    font-family: 'Glory', sans-serif;
  }

  & input {
    cursor: pointer;
  }

  & textarea:focus {
    outline: none;
    border-color: rgb(124, 58, 237);
  }
`;

export default function MessageBox({ onMessage, isJoin, onHandleJoin }) {
  const [content, setContent] = useState('');
  
  function handleOnEnter (content){
    console.log('enter', content)
    onMessage(content)
  }

  return (
    <>
      {!isJoin && <button onClick={onHandleJoin}>Quiero unirme! ✨✔️</button>}
      <InputEmoji 
          value={content}
          onChange={setContent}
          onEnter={handleOnEnter}
          cleanOnEnter
          onFocus
          placeholder="type a message 🚀"
          disabled={!isJoin}
        />
    </>
  );
}

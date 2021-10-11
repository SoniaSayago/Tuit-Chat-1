import { useState } from 'react';
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

  const onChangeContent = (event) => {
    setContent(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();

    onMessage(content);
  };

  return (
    <>
      {!isJoin && <button onClick={onHandleJoin}>Quiero unirme!</button>}
      <FormTextArea onSubmit={onSubmit}>
        <textarea
          rows="3"
          placeholder="Jot something down"
          value={content}
          onChange={onChangeContent}
          disabled={!isJoin}
        />
        {isJoin && <input type="submit" value="Send Message" />}
      </FormTextArea>
    </>
  );
}

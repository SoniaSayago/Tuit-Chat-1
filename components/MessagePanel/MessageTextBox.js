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

function MessageBox() {
  return (
    <FormTextArea>
      <textarea rows="3" placeholder="Jot something down" className="bg-purple-100" />;
      <input type="submit" value="Send Message" />
    </FormTextArea>
  );
}

export default MessageBox;

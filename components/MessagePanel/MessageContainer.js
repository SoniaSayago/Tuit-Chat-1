import Message from './Message';
// import SeparatorDate from './SeparatorDate';
import styled from 'styled-components';

const ContainerAllMessages = styled.div`
  overflow-y: scroll;
  height: 100%;
  margin-top: 5px;

  ::-webkit-scrollbar {
    width: 8px;
    height: 0;
  }

  ::-webkit-scrollbar-track {
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.4);
    background-color: rgba(199, 199, 199, 0.7);
  }
`;

function MessageContainer() {
  return (
    <ContainerAllMessages>
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
    </ContainerAllMessages>
  );
}

export default MessageContainer;

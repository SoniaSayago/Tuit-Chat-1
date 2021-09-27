import MessageContainer from './MessageContainer';
import MessageTextBox from './MessageTextBox';
import styled from 'styled-components';

const Container = styled.section`
  flex: 1 1 auto;
  padding: 25px;
`;

const ContainerHeader = styled.div`
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  & span {
    font-size: 0.9rem;
  }
`;

const ContainerBody = styled.div`
  height: calc(100% - 60px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

function MessagePanel() {
  return (
    <Container>
      <ContainerHeader>
        <div>
          <h1 className="m-0 text-xl font-bold">Channel name</h1>
          <span># members</span>
        </div>

        <div>Info</div>
      </ContainerHeader>

      <ContainerBody>
        <MessageContainer />
        <MessageTextBox />
      </ContainerBody>
    </Container>
  );
}

export default MessagePanel;

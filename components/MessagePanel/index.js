import MessageContainer from './MessageContainer';
import MessageTextBox from './MessageTextBox';

import { Container, ContainerHeader, ContainerBody } from './styles';

function MessagePanel() {
  return (
    <Container>
      <ContainerHeader>
        <div>
          <h3>Channel name</h3>
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

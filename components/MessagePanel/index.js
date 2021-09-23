import MessageContainer from './MessageContainer';
import MessageTextBox from './MessageTextBox';

import { Container, ContainerHeader, ContainerBody } from './styles';

function MessagePanel({name}) {
  return (
    <Container>
      <ContainerHeader>
        <div>
        <div>{name}</div>
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

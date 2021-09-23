import MessageContainer from './MessageContainer';
import MessageTextBox from './MessageTextBox';

import { Container, ContainerHeader, ContainerBody } from './styles';

export default function MessagePanel({ userSelected, onMessage }) {
  return (
    <Container>
      <ContainerHeader>
        <div>
          <h3>{userSelected ? userSelected.username : 'Channel by default'}</h3>
          <span># members</span>
        </div>

        <div>Info</div>
      </ContainerHeader>

      <ContainerBody>
        <MessageContainer userSelected={userSelected} />
        <MessageTextBox onMessage={onMessage} />
      </ContainerBody>
    </Container>
  );
}

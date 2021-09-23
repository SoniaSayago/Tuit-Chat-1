import MessageContainer from './MessageContainer';
import MessageTextBox from './MessageTextBox';

import { Container, ContainerHeader, ContainerBody } from './styles';

export default function MessagePanel({ userSelected, onMessage }) {
  return (
    <Container>
      <ContainerHeader>
        <div>
          <h1 className="m-0 text-xl font-bold">
            {userSelected ? userSelected.username : 'Channel by default'}
          </h1>
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

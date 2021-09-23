import Message from './Message';
// import SeparatorDate from './SeparatorDate';

import { ContainerAllMessages } from './styles';

export default function MessageContainer({ userSelected }) {
  return (
    <ContainerAllMessages>
      {userSelected &&
        userSelected.messages.map((message, index) => {
          const author = message.fromSelf ? 'Tú' : userSelected.username;
          return <Message key={index} message={message.content} author={author} />;
        })}
      {/* <SeparatorDate /> */}
    </ContainerAllMessages>
  );
}

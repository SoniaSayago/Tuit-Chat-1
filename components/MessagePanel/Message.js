import Image from 'next/image';

import { ContainerMessage, PhotoProfile, MessageInfo, SettingMessage } from './styles';

import avatar from '../../assets/user.png';

function Message() {
  return (
    <ContainerMessage>
      <PhotoProfile>
        <Image src={avatar} alt="Picture of the author" />
      </PhotoProfile>

      <MessageInfo>
        <div>
          <p>
            <span>User name</span>
            <span>5:35 PM</span>
          </p>

          <SettingMessage>. . .</SettingMessage>
        </div>

        <p>message</p>
      </MessageInfo>
    </ContainerMessage>
  );
}

export default Message;

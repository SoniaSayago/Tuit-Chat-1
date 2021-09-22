import Image from 'next/image';

import { ContainerMessage, PhotoProfile, MessageInfo, SettingMessage } from './styles';

import avatar from '../../assets/user.png';

function Message() {
  return (
    <ContainerMessage className="hover:bg-purple-200">
      <PhotoProfile>
        <Image src={avatar} width={36} height={36} alt="Picture of the author" />
      </PhotoProfile>

      <MessageInfo>
        <div>
          <p className="font-semibold">
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

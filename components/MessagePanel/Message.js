import Image from 'next/image';
import avatar from '../../assets/user.png';
import styled from 'styled-components';

const ContainerMessage = styled.div`
  display: flex;
  padding: 8px 15px;
  border-radius: 5px;
`;

const PhotoProfile = styled.div`
  height: 36px;
  width: 36px;
  margin: 5px 10px 0 0;
  border-radius: 50%;

  & img {
    object-fit: cover;
    width: 100%;
    height: auto;
  }
`;

const MessageInfo = styled.div`
  width: 100%;

  & p {
    margin: 2px 0 1px;
  }

  & p:first-child span:first-child {
    margin-right: 15px;
  }

  & p:first-child span:last-child {
    color: #747474;
    font-size: 0.8rem;
  }

  & div {
    display: flex;
    justify-content: space-between;
  }
`;

const SettingMessage = styled.div`
  visibility: hidden;
  ${ContainerMessage}:hover & {
    visibility: visible;
  }
`;

function Message({ message, author }) {
  return (
    <ContainerMessage className="hover:bg-purple-200">
      <PhotoProfile>
        <Image src={avatar} width={36} height={36} alt="Picture of the author" />
      </PhotoProfile>

      <MessageInfo>
        <div>
          <p className="font-semibold">
            <span>{author}</span>
            <span>5:35 PM</span>
          </p>

          <SettingMessage>. . .</SettingMessage>
        </div>

        <p>{message}</p>
      </MessageInfo>
    </ContainerMessage>
  );
}

export default Message;

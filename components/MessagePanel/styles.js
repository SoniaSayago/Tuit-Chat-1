import styled from 'styled-components';

export const Container = styled.section`
  flex: 1 1 auto;
  padding: 25px;
`;

export const ContainerHeader = styled.div`
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  & h3 {
    margin: 0;
  }

  & span {
    font-size: 0.9rem;
  }
`;

export const ContainerBody = styled.div`
  height: calc(100% - 60px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const ContainerMessage = styled.div`
  display: flex;
  padding: 8px 15px;
  border-radius: 5px;

  :hover {
    background-color: #28292c;
  }
`;

export const ContainerAllMessages = styled.div`
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

export const PhotoProfile = styled.div`
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

export const MessageInfo = styled.div`
  width: 100%;

  & p {
    margin: 2px 0;
  }

  & p:first-child span:first-child {
    font-weight: bold;
    margin-right: 15px;
  }

  & p:first-child span:last-child {
    color: #c4c4c4;
    font-size: 0.8rem;
  }

  & div {
    display: flex;
    justify-content: space-between;
  }
`;

export const SettingMessage = styled.div`
  visibility: hidden;
  ${ContainerMessage}:hover & {
    visibility: visible;
  }
`;

export const TextArea = styled.textarea`
  border-radius: 5px;
  color: #c9d1d9;
  background-color: #28292c;
  padding: 10px 12px;
  font-size: 18px;
  font-family: 'Glory', sans-serif;

  :focus {
    outline: none;
    border-color: rgb(153, 153, 153);
  }
`;

export const Separator = styled.p`
  font-size: 0.9rem;
  font-weight: bold;
  text-align: center;
  position: relative;
  margin: 6px 0 6px;
  padding: 8px 0;

  ::after {
    content: '';
    position: absolute;
    background-color: #28292c;
    top: 15px;
    left: 0;
    width: 100%;
    height: 1px;
    z-index: -2;
  }

  ::before {
    content: '';
    position: absolute;
    background-color: rgb(13, 17, 23);
    top: 0;
    left: calc(50% - 96px);
    height: 100%;
    width: 190px;
    z-index: -1;
    border-radius: 20px;
    border: 1px solid #28292c;
  }
`;

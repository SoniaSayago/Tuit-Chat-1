import styled from 'styled-components';

const Separator = styled.p`
  font-size: 0.9rem;
  font-weight: bold;
  text-align: center;
  position: relative;
  margin: 6px 0 6px;
  padding: 8px 0;

  ::after {
    content: '';
    position: absolute;
    background-color: rgb(124, 58, 237);
    top: 20px;
    left: 0;
    width: 100%;
    height: 1px;
    z-index: -2;
  }

  ::before {
    content: '';
    position: absolute;
    background-color: white;
    top: 0;
    left: calc(50% - 96px);
    height: 100%;
    width: 190px;
    z-index: -1;
  }
`;

function SeparatorDate() {
  return <Separator>Miércoles, 12 de Octubre</Separator>;
}

export default SeparatorDate;

import styled from 'styled-components';

export const Container = styled.section`
  width: 260px;
  padding: 25px;
  border-right: 1px solid #28292c;
  & h1,
  & h1 + p {
    margin: 8px 0px 5px 0;
    text-align: center;
  }
  & h1 + p {
    font-size: 1rem;
  }
`;

export const Detail = styled.details`
  margin-top: 30px;
  & summary {
    font-weight: bold;
    font-size: 1.2rem;
    margin-bottom: 10px;
  }
  & p {
    margin: 0;
    padding: 10px 0 10px 20px;
    border-radius: 5px;
    cursor: pointer;
  }
  & p:hover {
    background-color: #28292c;
  }
`;

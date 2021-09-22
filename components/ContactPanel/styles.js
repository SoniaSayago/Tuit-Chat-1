import styled from 'styled-components';

export const Container = styled.section`
  width: 260px;
  padding: 25px;
  color: white;
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
`;

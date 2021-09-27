import styled from 'styled-components';

const Detail = styled.details`
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
    position: relative;
  }

  & p span::after {
    content: '';
    position: absolute;
    background-color: rgb(164, 226, 19);
    border-radius: 50%;
    top: 17px;
    left: 8px;
    width: 10px;
    height: 10px;
  }
`;

function ContactList({ category }) {
  return (
    <Detail open>
      <summary>{category}</summary>
      <p className="hover:bg-purple-400">Name 1</p>
      <p className="hover:bg-purple-400">Name 2</p>
      <p className="hover:bg-purple-400">Name 3</p>
    </Detail>
  );
}

export default ContactList;

import styled from 'styled-components';

import ContactPanel from '../components/ContactPanel';
import MessagePanel from '../components/MessagePanel';

const ContDashboard = styled.div`
  display: flex;
  height: 100vh;
`;

function Dashboard() {
  return (
    <ContDashboard>
      <ContactPanel />
      <MessagePanel />
    </ContDashboard>
  );
}

export default Dashboard;

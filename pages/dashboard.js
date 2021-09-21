import { ContDashboard } from './styles';

import ContactPanel from '../components/ContactPanel';
import MessagePanel from '../components/MessagePanel';

function Dashboard() {
  return (
    <ContDashboard>
      <ContactPanel />
      <MessagePanel />
    </ContDashboard>
  );
}

export default Dashboard;

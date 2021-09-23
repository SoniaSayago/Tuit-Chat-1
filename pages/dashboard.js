import { ContDashboard } from './styles';

import ContactPanel from '../components/ContactPanel';
import MessagePanel from '../components/MessagePanel';

export default function Dashboard() {
  return (
    <ContDashboard>
      <ContactPanel />
      <MessagePanel />
    </ContDashboard>
  );
}

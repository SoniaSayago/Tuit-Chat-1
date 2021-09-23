import { ContDashboard } from './styles';
import ContactPanel from '../components/ContactPanel';
import MessagePanel from '../components/MessagePanel';
import fetch from 'isomorphic-unfetch';

export default function Dashboard({name}) {
  return (
    <>
    <ContDashboard>
      <ContactPanel />
      <MessagePanel name={JSON.stringify(name)}/>
    </ContDashboard>
    </>
  );
}

Dashboard.getInitialProps = async () => {
  const res = await fetch('https://slack-chats.herokuapp.com/users');
  const data = await res.json();

  return { name: data };
  }
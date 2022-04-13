import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../contexts/userContext';
import ProviderPicker from '../components/ProviderPicker';
import { Container } from '../styles/containers';

export default function Login() {
  const { user, authenticating } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate('/');
  }, [user]);

  return authenticating ? null : (
    <Container as='main' flex centered>
      <ProviderPicker />
    </Container>
  );
}

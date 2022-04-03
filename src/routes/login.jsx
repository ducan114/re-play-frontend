import ProviderPicker from '../components/ProviderPicker';
import { Container } from '../styles/containers';
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import UserContext from '../contexts/userContext';

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

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAPIContext } from '../contexts/APIContext';
import ProviderPicker from '../components/ProviderPicker/';
import { Container } from '../styles/containers';

export default function Login() {
  const { user, loadingUser } = useAPIContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate('/');
  }, [user]);

  return loadingUser ? null : (
    <Container as='main' flex centered>
      <ProviderPicker />
    </Container>
  );
}

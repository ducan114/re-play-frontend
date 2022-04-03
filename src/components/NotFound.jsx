import { Link } from 'react-router-dom';
import { Container } from '../styles/containers';
import { PrimaryButton } from '../styles/buttons';

export default function NotFound() {
  return (
    <Container as='main' flex centered col>
      <h1>404 - That page does not seem to exist...</h1>
      <Link to='/'>
        <PrimaryButton whileHover={{ scale: 1.05 }} whileTap={{ scalde: 0.95 }}>
          Go Home
        </PrimaryButton>
      </Link>
    </Container>
  );
}

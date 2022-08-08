import { Link } from 'react-router-dom';
import { Container } from '../../styles/containers';
import { PrimaryButton } from '../../styles/buttons';

export default function PermissionDenied() {
  return (
    <Container as='main' flex centered col>
      <h1 style={{ textAlign: 'center', marginBottom: '1em' }}>
        401 - Permissions denied!
      </h1>
      <Link to='/'>
        <PrimaryButton whileHover={{ scale: 1.05 }} whileTap={{ scalde: 0.95 }}>
          Go Home
        </PrimaryButton>
      </Link>
    </Container>
  );
}

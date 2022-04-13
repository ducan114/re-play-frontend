import { useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../contexts/userContext';
import FilmModal from '../components/FilmModal';
import styled from 'styled-components';
import { AnimatePresence } from 'framer-motion';
import PermissionDenied from '../components/PermissionDenied';
import { Container } from '../styles/containers';
import { Card, CardItem, CardContent } from '../styles/cards';
import { createFilm } from '../API';

export default function Admin() {
  const { user, authenticating, accessToken } = useContext(UserContext);
  const [showAddFilm, setShowAddFilm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authenticating && !user) return navigate('/');
  }, [authenticating, user]);

  return !authenticating && user && user.role === 'admin' ? (
    <Container as='main' pd='2em 0'>
      <Card pd='2em'>
        <CardContent>
          <HCardItem pointer bb onClick={() => setShowAddFilm(true)}>
            Add film
          </HCardItem>
        </CardContent>
      </Card>
      <AnimatePresence exitBeforeEnter>
        {showAddFilm && (
          <FilmModal
            onBackdropClick={() => setShowAddFilm(false)}
            onSubmit={data => createFilm(accessToken, data)}
            action='Create'
          />
        )}
      </AnimatePresence>
    </Container>
  ) : (
    <PermissionDenied />
  );
}

const HCardItem = styled(CardItem)`
  transition: all 300ms;

  :hover {
    font-weight: 700;
    box-shadow: var(--shadow-border);
    background-color: var(--colors-primary-dark-2);
  }
`;

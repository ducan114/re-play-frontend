import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAPIContext } from '../contexts/APIContext';
import FilmModal from '../components/FilmModal/';
import PermissionDenied from '../components/PermissionDenied/';
import Loader from '../components/Loader/';
import GenresModal from '../components/GenresModal/';
import styled from 'styled-components';
import { AnimatePresence } from 'framer-motion';
import { Container } from '../styles/containers';
import { Card, CardItem, CardContent, CardTitle } from '../styles/cards';

export default function Admin() {
  const { user, loadingUser } = useAPIContext();
  const [showAddFilm, setShowAddFilm] = useState(false);
  const [showGenresManagement, setShowGenresManagement] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loadingUser && !user) return navigate('/');
  }, [loadingUser, user]);

  return !loadingUser && user && user.role !== 'admin' ? (
    <PermissionDenied />
  ) : (
    <Container as='main' pd='2em 0'>
      {loadingUser ? (
        <Loader />
      ) : (
        user && (
          <>
            <Card pd='2em'>
              <CardTitle as='div' fs='1.25rem'>
                Films
              </CardTitle>
              <CardContent>
                <HCardItem pointer bb onClick={() => setShowAddFilm(true)}>
                  <span className='material-symbols-outlined'>add</span>
                  Add film
                </HCardItem>
                <HCardItem
                  pointer
                  bb
                  onClick={() => setShowGenresManagement(true)}
                >
                  <span className='material-symbols-outlined'>category</span>
                  Genres Management
                </HCardItem>
              </CardContent>
            </Card>
            <AnimatePresence exitBeforeEnter>
              {showAddFilm && (
                <FilmModal
                  onBackdropClick={() => setShowAddFilm(false)}
                  action='Create'
                />
              )}
            </AnimatePresence>
            <AnimatePresence exitBeforeEnter>
              {showGenresManagement && (
                <GenresModal
                  onBackdropClick={() => setShowGenresManagement(false)}
                />
              )}
            </AnimatePresence>
          </>
        )
      )}
    </Container>
  );
}

const HCardItem = styled(CardItem)`
  transition: all 300ms;
  display: flex;
  column-gap: 0.5em;

  :hover {
    font-weight: 700;
    box-shadow: var(--shadow-border);
    background-color: var(--colors-primary-dark-2);

    span.material-symbols-outlined {
      font-variation-settings: 'wght' 700;
    }
  }
`;

import { useState, useEffect } from 'react';
import { useAPIContext } from '../../contexts/APIContext';
import Modal from '../Modal';
import { Wrapper, Genres, AddGenre, GenreList } from './GenresModal.styles';
import GenreModal from './GenreModal';
import GenreItem from './Genre';
import { AnimatePresence } from 'framer-motion';
import { FormTitle, FormControl } from '../../styles/forms';
import { SuccessButton } from '../../styles/buttons';

export default function GenresModal({
  onBackdropClick,
  selectedGenres,
  setSelectedGenres,
  onUpdate
}) {
  const {
    API: { Genre }
  } = useAPIContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [genres, setGenres] = useState([]);
  const [newUpdate, setNewUpdate] = useState(false);
  const [showAddGenre, setShowAddGenre] = useState(false);
  const [showEditGenre, setShowEditGenre] = useState(false);
  const [genreToEdit, setGenreToEdit] = useState();
  const [isSelected, setIsSelected] = useState({});

  useEffect(() => {
    Genre.findMany().then(data => setGenres(data.genres));
    if (selectedGenres) {
      const selectedGenresMap = {};
      selectedGenres.forEach(genre => (selectedGenresMap[genre._id] = true));
      setIsSelected(selectedGenresMap);
    }
  }, []);

  useEffect(() => {
    if (!newUpdate) return;
    setNewUpdate(false);
    Genre.findMany().then(data => setGenres(data.genres));
  }, [newUpdate]);

  const onClose = () => {
    if (setSelectedGenres)
      setSelectedGenres(genres.filter(genre => isSelected[genre._id]));
    onBackdropClick();
  };

  return (
    <>
      <Modal onBackdropClick={onBackdropClick}>
        <Wrapper as='div' pd='.5em'>
          <FormTitle>Genres Management</FormTitle>
          <label htmlFor='rpgsearch' data-is-icon>
            <span className='material-symbols-outlined'>search</span>
          </label>
          <input
            onChange={e => setSearchTerm(e.target.value)}
            value={searchTerm}
            type='text'
            id='rpgsearch'
          />
          <Genres>Genres</Genres>
          <AddGenre
            onClick={() => setShowAddGenre(prev => !prev)}
            className='material-symbols-outlined'
            whileHover={{
              scale: 1.1
            }}
            whileTap={{ scale: 0.9 }}
            title='New genre'
          >
            add
          </AddGenre>
          <GenreList>
            {genres.map(genre => (
              <GenreItem
                genre={genre}
                key={genre._id}
                onUpdate={() => {
                  setNewUpdate(true);
                  if (onUpdate) onUpdate();
                }}
                onEdit={() => {
                  setGenreToEdit(genre);
                  setShowEditGenre(true);
                }}
                selected={isSelected[genre._id]}
                onClick={() =>
                  selectedGenres &&
                  setIsSelected({
                    ...isSelected,
                    [genre._id]: !isSelected[genre._id]
                  })
                }
              />
            ))}
          </GenreList>
          <FormControl sticky>
            <SuccessButton
              onClick={onClose}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              shadow
            >
              Done
            </SuccessButton>
          </FormControl>
        </Wrapper>
      </Modal>
      <AnimatePresence>
        {showAddGenre && (
          <GenreModal
            onBackdropClick={() => setShowAddGenre(false)}
            onSuccess={() => setNewUpdate(true)}
            action='Create'
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showEditGenre && (
          <GenreModal
            onBackdropClick={() => setShowEditGenre(false)}
            onSuccess={
              selectedGenres &&
              selectedGenres.some(genre => genre.name === genreToEdit.name)
                ? () => {
                    setNewUpdate(true);
                    onUpdate();
                  }
                : () => setNewUpdate(true)
            }
            action='Update'
            genre={genreToEdit}
          />
        )}
      </AnimatePresence>
    </>
  );
}

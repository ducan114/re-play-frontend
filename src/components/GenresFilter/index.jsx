import { useState } from 'react';
import GenresModal from '../GenresModal';
import { AnimatePresence } from 'framer-motion';

export default function GenresFilter({ genres, setGenres }) {
  const [showGenresModal, setShowGenresModal] = useState(false);

  return (
    <>
      <span
        onClick={() => setShowGenresModal(true)}
        className='material-symbols-outlined'
      >
        filter_alt
      </span>
      <AnimatePresence>
        {showGenresModal && (
          <GenresModal
            onBackdropClick={() => setShowGenresModal(false)}
            selectedGenres={genres}
            setSelectedGenres={setGenres}
          />
        )}
      </AnimatePresence>
    </>
  );
}

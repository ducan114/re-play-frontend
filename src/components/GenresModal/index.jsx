import { useState } from 'react';
import Modal from '../Modal';
import { Wrapper, Genres, AddGenre } from './GenresModal.styles';
import { FormTitle, FormControl } from '../../styles/forms';
import { SuccessButton } from '../../styles/buttons';

export default function GenresModal({ onBackdropClick }) {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <Modal onBackdropClick={onBackdropClick}>
      <Wrapper as='div'>
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
          className='material-symbols-outlined'
          whileHover={{
            scale: 1.1
          }}
          whileTap={{ scale: 0.9 }}
          title='New genre'
        >
          add
        </AddGenre>
        <FormControl sticky>
          <SuccessButton
            onClick={onBackdropClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            shadow
          >
            Done
          </SuccessButton>
        </FormControl>
      </Wrapper>
    </Modal>
  );
}

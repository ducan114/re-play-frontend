import { useAPIContext } from '../../contexts/APIContext';
import toast from 'react-hot-toast';
import {
  GenreWrapper,
  GenreName,
  GenreActions,
  EditGenreIcon,
  DeleteGenreIcon
} from './GenresModal.styles';

export default function Genre({ genre, onUpdate, onEdit }) {
  const {
    API: { Genre }
  } = useAPIContext();

  const handleDeleteGenre = () =>
    toast.promise(Genre.delete(genre.name), {
      loading: `Deleting genre ${genre.name}`,
      success: () => {
        if (onUpdate) onUpdate();
        return 'Genre deleted';
      },
      error: 'Failed to delete genre\nPlease check your connections'
    });

  return (
    <GenreWrapper>
      <GenreName>{genre.name}</GenreName>
      <GenreActions>
        <EditGenreIcon
          onClick={onEdit}
          className='material-symbols-outlined'
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          edit
        </EditGenreIcon>
        <DeleteGenreIcon
          onClick={handleDeleteGenre}
          className='material-symbols-outlined'
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          delete
        </DeleteGenreIcon>
      </GenreActions>
    </GenreWrapper>
  );
}

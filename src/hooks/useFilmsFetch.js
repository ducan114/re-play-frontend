import { useState, useEffect } from 'react';
import { useAPIContext } from '../contexts/APIContext';
import toast from 'react-hot-toast';

export default function useFilmsFetch({ mode = 'search' } = {}) {
  const {
    API: { Film }
  } = useAPIContext();

  const [searchTerm, setSearchTerm] = useState('');
  const [genres, setGenres] = useState([]);
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imagesLoading, setImagesLoading] = useState(0);

  useEffect(() => {
    setFilms([]);
    setLoading(true);
    Film.findMany(
      mode,
      searchTerm,
      genres.map(genre => genre.name)
    )
      .then(data => {
        setFilms(prevFilms => {
          const sortFunction = (a, b) => a - b;
          const prevFilmIds = prevFilms
            .map(film => film._id)
            .sort(sortFunction);
          const filmIds = data.films.map(film => film._id).sort(sortFunction);
          const isIdenticalFilms =
            filmIds.length === prevFilmIds.length &&
            filmIds.every((filmId, id) => filmId === prevFilmIds[id]);
          if (!isIdenticalFilms) setImagesLoading(data.films.length);
          return data.films;
        });
      })
      .catch(() =>
        toast.error('Fail to load films\nPlease check your connections')
      )
      .finally(() => setLoading(false));
  }, [searchTerm, genres]);

  return {
    films,
    loading,
    imagesLoading,
    setImagesLoading,
    setSearchTerm,
    setGenres
  };
}

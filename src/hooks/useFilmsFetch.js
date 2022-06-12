import { useState, useEffect } from 'react';
import { useAPIContext } from '../contexts/APIContext';
import toast from 'react-hot-toast';

export default function useFilmsFetch({
  mode = 'search',
  searchTerm = '',
} = {}) {
  const {
    API: { Film },
  } = useAPIContext();
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imagesLoading, setImagesLoading] = useState(0);

  useEffect(() => {
    setFilms([]);
    setLoading(true);
    Film.findMany(mode, searchTerm)
      .then(data => {
        setFilms(data.films);
        setImagesLoading(data.films.length);
      })
      .catch(() =>
        toast.error('Fail to load films\nPlease check your connections')
      )
      .finally(() => setLoading(false));
  }, [searchTerm]);

  return { films, loading, imagesLoading, setImagesLoading };
}

import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { fetchFilms } from '../API';

export default function useHomeFetch() {
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imagesLoading, setImagesLoading] = useState(0);

  useEffect(() => {
    fetchFilms()
      .then(data => {
        setFilms(data);
        setImagesLoading(data.length);
      })
      .catch(() =>
        toast.error('Fail to load films\nPlease check your connections')
      )
      .finally(() => setLoading(false));
  }, []);

  return { films, loading, imagesLoading, setImagesLoading };
}

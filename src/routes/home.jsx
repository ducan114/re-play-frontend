import { useState } from 'react';
import useFilmsFetch from '../hooks/useFilmsFetch';
import Loader from '../components/Loader';
import Thumbnail from '../components/Thumbnail';
import SearchBar from '../components/SearchBar';
import { Container } from '../styles/containers';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const { films, loading, imagesLoading, setImagesLoading } = useFilmsFetch({
    searchTerm,
  });

  return (
    <main>
      <SearchBar setSearchTerm={setSearchTerm} />
      <Container
        pd='2em 0'
        grid={!loading && imagesLoading === 0}
        gtc='repeat(auto-fill, minmax(200px, 1fr))'
        cg='1em'
        rg='1em'
        style={{ minHeight: '200vh' }}>
        {films.map(film => (
          <Thumbnail
            title={film.title}
            to={`/films/${film.slug}`}
            img={film.poster}
            key={film._id}
            onLoaded={() => setImagesLoading(prev => prev - 1)}
            hidden={imagesLoading > 0}
          />
        ))}
        {(loading || imagesLoading > 0) && <Loader />}
      </Container>
    </main>
  );
}

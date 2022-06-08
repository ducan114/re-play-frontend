import useFilmsFetch from '../hooks/useFilmsFetch';
import { Container } from '../styles/containers';
import Thumbnail from '../components/Thumbnail';
import Loader from '../components/Loader';

export default function Home() {
  const { films, loading, imagesLoading, setImagesLoading } =
    useFilmsFetch('toplike');

  return (
    <Container
      as='main'
      pd='2em 0'
      grid={!loading && imagesLoading === 0}
      gtc='repeat(auto-fill, minmax(200px, 1fr))'
      cg='1em'
      rg='1em'>
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
  );
}

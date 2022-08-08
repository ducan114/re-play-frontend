import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import GenresFilter from '../GenresFilter';
import { Wrapper, SearchBox } from './SearchBar.styles';
import { Container } from '../../styles/containers';

const DEBOUNCE_TIMEOUT = 300; // milliseconds.

export default function SearchBar({ setSearchTerm, setGenres }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchString, setSearchString] = useState(searchParams.get('q') || '');
  const [gs, setGs] = useState(
    searchParams.getAll('genre').map(genre => ({ name: genre })) || []
  );
  // Debounce user's search string typing and genres selection to reduce API calls.
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchTerm(searchString);
      setGenres(gs);
      if (!searchString) searchParams.delete('q');
      else searchParams.set('q', searchString);
      searchParams.delete('genre');
      gs.forEach(genre => searchParams.append('genre', genre.name));
      setSearchParams(searchParams);
    }, DEBOUNCE_TIMEOUT);
    return () => clearTimeout(timer);
  }, [searchString, gs]);

  return (
    <Wrapper>
      <Container flex centered cg='.25em'>
        <SearchBox>
          <label htmlFor='rpsearch'>
            <span className='material-symbols-outlined'>search</span>
          </label>
          <input
            value={searchString}
            onChange={e => setSearchString(e.target.value)}
            type='text'
            id='rpsearch'
            placeholder='Find you favorite film!'
          />
          <label
            htmlFor='rpsearch'
            onClick={() => setSearchString('')}
            hidden={!searchString}
          >
            <span className='material-symbols-outlined'>clear</span>
          </label>
        </SearchBox>
        <GenresFilter genres={gs} setGenres={setGs} />
      </Container>
    </Wrapper>
  );
}

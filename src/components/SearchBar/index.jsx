import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Wrapper, SearchBox } from './SearchBar.styles';
import { Container } from '../../styles/containers';

const DEBOUNCE_TIMEOUT = 300; // milliseconds.

export default function SearchBar({ setSearchTerm }) {
  const [searchString, setSearchString] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setSearchString(searchParams.get('q') || '');
  }, []);
  // Debounce user's search string typing to reduce API calls.
  useEffect(() => {
    const timer = setTimeout(() => {
      console.log(searchParams);
      setSearchTerm(searchString);
      if (!searchString) {
        searchParams.delete('q');
        setSearchParams(searchParams);
      } else {
        searchParams.set('q', searchString);
        setSearchParams(searchParams);
      }
    }, DEBOUNCE_TIMEOUT);
    return () => clearTimeout(timer);
  }, [searchString]);

  return (
    <Wrapper>
      <Container flex centered cg='1em'>
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
            hidden={!searchString}>
            <span className='material-symbols-outlined'>clear</span>
          </label>
        </SearchBox>
      </Container>
    </Wrapper>
  );
}

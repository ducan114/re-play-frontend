import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const wordsPerMin = 250;
const wordsPerSec = wordsPerMin / 60;

export default function Thumbnail({
  title,
  img,
  to,
  onLoaded,
  hidden,
  children
}) {
  const titleRef = useRef(null);

  useEffect(() => {
    if (!title) return;
    const e = titleRef.current;
    e.style.setProperty('--width', e.clientWidth + 'px');
    new ResizeObserver(() =>
      e.style.setProperty('--width', e.clientWidth + 'px')
    ).observe(e);
  }, [titleRef]);

  return (
    <Wrapper as={to && Link} to={to} title={title} hidden={hidden}>
      <Image
        as={motion.img}
        src={img}
        alt='film-thumb-nail'
        onLoad={() => {
          if (onLoaded) onLoaded();
        }}
        initial={{ opacity: 0 }}
        animate={{
          opacity: hidden ? 0 : 1,
          transition: {
            duration: 0.7
          }
        }}
      />
      {title && (
        <Title ref={titleRef} tt={title.length / 2 / wordsPerSec + 's'}>
          <div>
            <span>{title}</span>
          </div>
        </Title>
      )}
      {children}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  aspect-ratio: 3/4;
  background-color: var(--colors-secondary-translucent);

  :hover img {
    filter: brightness(75%);
  }
`;
const Title = styled.div`
  --ph: 1em;
  background-color: var(--colors-secondary-translucent);
  color: var(--colors-primary-dark-2);
  box-shadow: var(--shadow-border-super-big);
  position: absolute;
  bottom: 0;
  width: 100%;
  text-align: center;
  padding: 0.5em var(--ph);

  div {
    overflow: hidden;
    text-overflow: ellipsis;
  }

  span {
    white-space: nowrap;
    min-width: 100%;
  }

  :hover span {
    display: inline-block;
    transition: ${props => props.tt} linear;
    transform: translateX(calc(var(--width) - 2 * var(--ph) - 100%));
  }
`;

const Image = styled.img`
  object-fit: cover;
  display: block;
  width: 100%;
  height: 100%;
`;

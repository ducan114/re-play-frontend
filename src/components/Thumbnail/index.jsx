import { useEffect, useRef } from 'react';
import { Wrapper, Title, Image } from './Thumbnail.styles';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const wordsPerMin = 250;
const wordsPerSec = wordsPerMin / 60;

export default function Thumbnail({
  title,
  img,
  to,
  onLoaded,
  hidden,
  children,
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
            duration: 0.7,
          },
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

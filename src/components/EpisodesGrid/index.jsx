import { Link } from 'react-router-dom';
import { Episode } from './EpisodesGrid.styles';
import { Card, CardTitle, CardContent } from '../../styles/cards';

export default function EpisodesGrid({ slug, episodes, hidden }) {
  return (
    <Card as='section' hidden={hidden} m='0 0 2em'>
      <CardTitle as='h2' fs='1.25rem' m='0 0 .5em'>
        Episodes
      </CardTitle>
      <CardContent
        flex
        fwrap
        centered={episodes && episodes.length === 0}
        cg='.75em'
        rg='.75em'
      >
        {episodes && episodes.length === 0 && 'This film has no episode yet'}
        {episodes &&
          episodes.map(ep => (
            <Episode
              as={Link}
              to={`/films/${slug}/${ep.episodeNumber}`}
              key={ep.episodeNumber}
            >
              {ep.episodeNumber}
            </Episode>
          ))}
      </CardContent>
    </Card>
  );
}

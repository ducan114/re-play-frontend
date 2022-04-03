import { Container } from '../styles/containers';
export default function Home() {
  return (
    <Container
      as='main'
      pd='2em 0'
      grid
      gtc='repeat(auto-fill, minmax(200px, 1fr))'
      cg='1em'
      rg='1em'
    >
      Home page
    </Container>
  );
}

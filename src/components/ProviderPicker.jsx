import styled from 'styled-components';
import { Card, CardItem, CardTitle, CardContent } from '../styles/cards';
import GoogleLogo from '../assets/images/google.png';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function ProviderPicker() {
  return (
    <ProviderPickerCard>
      <CardTitle m='0 0 .5em' c='var(--colors-secondary)' ta='center'>
        Choose a provider
      </CardTitle>
      <CardContent>
        <Provider
          pd='.5em'
          as='a'
          href={`${API_BASE_URL}/signin/oauth2/google`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          bb
        >
          <ProviderLogo src={GoogleLogo} alt='google-logo' />
          <span>Google</span>
        </Provider>
      </CardContent>
    </ProviderPickerCard>
  );
}

const ProviderPickerCard = styled(Card)`
  max-width: 500px;
  width: 90%;
  margin: 3em 0;
  flex-grow: 1;
`;

const Provider = styled(CardItem)`
  display: flex;
  justify-content: center;
  column-gap: 1.5em;
  align-items: center;
  font-size: 1.5rem;

  :hover {
    box-shadow: var(--shadow-border-medium);
  }
`;
const ProviderLogo = styled.img`
  width: 40px;
  height: 40px;
  display: block;
`;

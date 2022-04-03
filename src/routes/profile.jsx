import { useContext, useEffect } from 'react';
import UserContext from '../contexts/userContext';
import { Container } from '../styles/containers';
import { useNavigate } from 'react-router-dom';
import { Card, CardItem } from '../styles/cards';
import { BigProfileImage } from '../styles/images';
import styled from 'styled-components';
import { getFullname } from '../helpers';

export default function Profile() {
  const { user, authenticating } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authenticating && !user) navigate('/');
  }, [authenticating, user]);

  return authenticating || !user ? null : (
    <Container as='main' pd='2em 0'>
      <StyledProfile>
        <BigProfileImage src={user.profileImage} alt='user-profile-image' />
        <CardItem>{getFullname(user)}</CardItem>
      </StyledProfile>
    </Container>
  );
}

const StyledProfile = styled(Card)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

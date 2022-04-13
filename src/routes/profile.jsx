import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../contexts/userContext';
import { Container } from '../styles/containers';
import { Card, CardItem, CardContent } from '../styles/cards';
import { BigProfileImage } from '../styles/images';
import { getFullname } from '../helpers';

export default function Profile() {
  const { user, authenticating } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authenticating && !user) navigate('/');
  }, [authenticating, user]);

  return authenticating || !user ? null : (
    <Container as='main' pd='2em 0'>
      <Card>
        <CardContent flex centered col>
          <BigProfileImage src={user.profileImage} alt='user-profile-image' />
          <CardItem>{getFullname(user)}</CardItem>
        </CardContent>
      </Card>
    </Container>
  );
}

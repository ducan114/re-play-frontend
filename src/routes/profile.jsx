import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAPIContext } from '../contexts/APIContext';
import { Container } from '../styles/containers';
import { Card, CardItem, CardContent } from '../styles/cards';
import { BigProfileImage } from '../styles/images';
import { getFullname } from '../helpers';

export default function Profile() {
  const { user, loadingUser } = useAPIContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loadingUser && !user) navigate('/');
  }, [loadingUser, user]);

  return loadingUser || !user ? null : (
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

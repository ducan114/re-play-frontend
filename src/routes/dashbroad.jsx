import React, { useEffect } from 'react'
import { Container } from '../styles/containers';
import Dashbroad from '../components/Dashbroad';
import { useAPIContext } from '../contexts/APIContext';

const DashbroadRoute = () => {
  const { user, loadingUser } = useAPIContext();

  useEffect(() => {
    if (!loadingUser && !user) return navigate('/');
  }, [loadingUser, user]);


  return !loadingUser && user && user.role !== 'admin' ? (
    <PermissionDenied />
  ) : (
    <Container as='main'>
        <Dashbroad />
    </Container>
  )
}

export default DashbroadRoute
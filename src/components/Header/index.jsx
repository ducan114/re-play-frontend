import { useState, useEffect } from 'react';
import { useLocation, matchPath, Link } from 'react-router-dom';
import { useAPIContext } from '../../contexts/APIContext';
import { AnimatePresence } from 'framer-motion';
import Menu from './Menu';
import {
  StyledHeader,
  Nav,
  MobileNavButton,
  NavList,
  NavItem,
  HeaderProfileImage
} from './Header.styles';
import { Logo } from '../../styles/logos';
import { SecondaryButton } from '../../styles/buttons';
import { Container } from '../../styles/containers';

export default function Header() {
  const { user, loadingUser } = useAPIContext();
  const [showMenu, setShowMenu] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const location = useLocation();

  const isHomeActive = !!matchPath(location.pathname, '/');
  const isTopViewActive = !!matchPath(location.pathname, '/films/topview');
  const isTopLikeActive = !!matchPath(location.pathname, '/films/toplike');
  const isInFront = isHomeActive || isTopViewActive || isTopLikeActive;

  useEffect(() => {
    if (isMobileNavOpen) document.body.classList.add('modal-open');
    else document.body.classList.remove('modal-open');
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, [isMobileNavOpen]);

  return (
    <StyledHeader>
      <Container flex>
        <Nav>
          <MobileNavButton
            className='material-symbols-outlined'
            onClick={() => setIsMobileNavOpen(prev => !prev)}
          >
            {isMobileNavOpen ? 'close' : 'menu'}
          </MobileNavButton>

          <Logo>
            <Link to={`/${isInFront ? location.search : ''}`}>RePlay</Link>
          </Logo>

          <NavList isMobileNavOpen={isMobileNavOpen}>
            <NavItem active={isHomeActive}>
              <Link to={`/${isInFront ? location.search : ''}`}>New</Link>
            </NavItem>
            <NavItem active={isTopViewActive}>
              <Link to={`/films/topview${isInFront ? location.search : ''}`}>
                Top View
              </Link>
            </NavItem>
            <NavItem active={isTopLikeActive}>
              <Link to={`/films/toplike${isInFront ? location.search : ''}`}>
                Top Like
              </Link>
            </NavItem>
          </NavList>
        </Nav>
        {loadingUser ? (
          <HeaderProfileImage as='span' className='material-symbols-outlined'>
            account_circle
          </HeaderProfileImage>
        ) : user ? (
          <>
            <HeaderProfileImage
              src={user.profileImage}
              alt='user-profile-image'
              onClick={() => setShowMenu(!showMenu)}
            />
            <AnimatePresence exitBeforeEnter>
              {showMenu && (
                <Menu
                  admin={user.role === 'admin'}
                  onClose={() => setShowMenu(false)}
                />
              )}
            </AnimatePresence>
          </>
        ) : (
          <Link to={`/login?next=${encodeURIComponent(location.pathname)}`}>
            <SecondaryButton
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Sign In
            </SecondaryButton>
          </Link>
        )}
      </Container>
    </StyledHeader>
  );
}

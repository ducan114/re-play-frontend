import { useState, useRef, useEffect } from 'react';
import { useAPIContext } from '../contexts/APIContext';
import styled from 'styled-components';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { Logo } from '../styles/logos';
import { ProfileImage } from '../styles/images';
import { SecondaryButton } from '../styles/buttons';
import { Container } from '../styles/containers';
import { Link } from 'react-router-dom';
import { useLocation, matchPath } from 'react-router-dom';

export default function Header() {
  const { user, loadingUser } = useAPIContext();
  const [showMenu, setShowMenu] = useState(false);
  const location = useLocation();

  return (
    <StyledHeader>
      <Container flex>
        <Nav>
          <NavList>
            <NavItem>
              <Logo>
                <Link to='/'>RePlay</Link>
              </Logo>
            </NavItem>
            <NavItem active={!!matchPath(location.pathname, '/')}>
              <Link to='/'>New</Link>
            </NavItem>
            <NavItem active={!!matchPath(location.pathname, '/topview')}>
              <Link to='/topview'>Top View</Link>
            </NavItem>
            <NavItem active={!!matchPath(location.pathname, '/toplike')}>
              <Link to='/toplike'>Top Like</Link>
            </NavItem>
          </NavList>
        </Nav>
        {loadingUser ? null : user ? (
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
          <Link to='/login'>
            <SecondaryButton
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}>
              Sign In
            </SecondaryButton>
          </Link>
        )}
      </Container>
    </StyledHeader>
  );
}

function Menu({ admin, onClose }) {
  const {
    setUser,
    API: { User },
  } = useAPIContext();
  const menuRef = useRef(null);

  useEffect(() => {
    const listener = e => {
      if (menuRef.current.contains(e.target)) return;
      onClose();
    };
    document.addEventListener('click', listener);
    return () => document.removeEventListener('click', listener);
  }, [menuRef]);

  const onSignOut = async () => {
    try {
      await User.signOut();
      setUser(null);
      toast.success('Signed out!');
    } catch (err) {
      toast.error('Sign out failed.\nPlease check your connections');
    }
  };

  const dropIn = {
    hidden: {
      scale: 0.75,
      opacity: 0,
    },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.1,
      },
    },
    exit: {
      scale: 0.75,
      opacity: 0,
      transition: {
        duration: 0.1,
      },
    },
  };

  return (
    <StyledMenu
      initial='hidden'
      animate='visible'
      exit='exit'
      variants={dropIn}
      ref={menuRef}>
      <ul>
        <MenuItem>
          <Link to='/profile'>Profile</Link>
        </MenuItem>
        {admin && (
          <MenuItem>
            <Link to='/admin'>Administration</Link>
          </MenuItem>
        )}
        <MenuItem onClick={onSignOut}>Sign out</MenuItem>
      </ul>
    </StyledMenu>
  );
}

const StyledHeader = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 2;
  min-height: var(--header-height);
  background-color: var(--colors-secondary);
  padding: 10px 0;
`;

const HeaderProfileImage = styled(ProfileImage)`
  border: 2px solid white;
  padding: 2px;
  cursor: pointer;
`;

const StyledMenu = styled(motion.nav)`
  position: absolute;
  top: calc(100% + 3px);
  right: 3px;
  box-shadow: var(--shadow-border-big);
  background-color: var(--colors-primary);
  min-width: 200px;
  border-radius: 5px;
`;

const MenuItem = styled.li`
  border-bottom: 1px solid var(--colors-primary-dark-2);
  padding: 5px 0px;
  margin: 0 20px;
  cursor: pointer;
  list-style: none;

  a {
    display: block;
    width: 100%;
  }

  :hover {
    color: var(--colors-secondary-dark);
    font-weight: 700;
  }
`;

const Nav = styled.nav`
  margin-right: auto;
`;

const NavList = styled.ul`
  list-style: none;
  display: flex;
  align-items: baseline;
  column-gap: 1em;
`;

const NavItem = styled.li`
  font-size: 1rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: -1px;
  color: var(--colors-primary-dark-2);

  :hover {
    color: var(--colors-primary);
  }

  ${props =>
    props.active && 'border-bottom: 3px solid var(--colors-primary-dark-1);'}
  ${props => props.active && 'color: var(--colors-primary);'}
`;

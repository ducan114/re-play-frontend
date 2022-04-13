import { useContext, useState, useRef, useEffect } from 'react';
import UserContext from '../contexts/userContext';
import styled from 'styled-components';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { Logo } from '../styles/logos';
import { ProfileImage } from '../styles/images';
import { SecondaryButton } from '../styles/buttons';
import { Container } from '../styles/containers';
import { Link } from 'react-router-dom';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function Header() {
  const { user, authenticating } = useContext(UserContext);
  const [showMenu, setShowMenu] = useState(false);

  return (
    <StyledHeader>
      <Container flex>
        <Logo as={Link} to='/'>
          RePlay
        </Logo>

        {authenticating ? null : user ? (
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

function Menu({ admin, onClose }) {
  const { setUser, setAccessToken } = useContext(UserContext);
  const menuRef = useRef(null);

  useEffect(() => {
    const listener = e => {
      if (menuRef.current.contains(e.target)) return;
      onClose();
    };
    document.addEventListener('click', listener);

    return () => document.removeEventListener('click', listener);
  }, [menuRef]);

  const signOut = async () => {
    try {
      await fetch(`${API_BASE_URL}/signout`, {
        credentials: 'include'
      });

      setUser(null);
      setAccessToken(null);
      toast.success('Signed out!');
    } catch (err) {
      toast.error('Sign out failed.\nPlease check your connections');
    }
  };

  const dropIn = {
    hidden: {
      scale: 0.75,
      opacity: 0
    },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.1
      }
    },
    exit: {
      scale: 0.75,
      opacity: 0,
      transition: {
        duration: 0.1
      }
    }
  };

  return (
    <StyledMenu
      initial='hidden'
      animate='visible'
      exit='exit'
      variants={dropIn}
      ref={menuRef}
    >
      <ul>
        <MenuItem>
          <Link to='/profile'>Profile</Link>
        </MenuItem>
        {admin && (
          <MenuItem>
            <Link to='/admin'>Administration</Link>
          </MenuItem>
        )}
        <MenuItem onClick={signOut}>Sign out</MenuItem>
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

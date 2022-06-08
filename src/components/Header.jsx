import { useState, useRef, useEffect } from 'react';
import { useLocation, matchPath } from 'react-router-dom';
import { useAPIContext } from '../contexts/APIContext';
import styled from 'styled-components';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { Logo } from '../styles/logos';
import { ProfileImage } from '../styles/images';
import { SecondaryButton } from '../styles/buttons';
import { Container } from '../styles/containers';
import { Link } from 'react-router-dom';

export default function Header() {
  const { user, loadingUser } = useAPIContext();
  const [showMenu, setShowMenu] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const location = useLocation();

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
            onClick={() => setIsMobileNavOpen(prev => !prev)}>
            {isMobileNavOpen ? 'close' : 'menu'}
          </MobileNavButton>

          <Logo>
            <Link to='/'>RePlay</Link>
          </Logo>

          <NavList isMobileNavOpen={isMobileNavOpen}>
            <NavItem active={!!matchPath(location.pathname, '/')}>
              <Link to='/'>New</Link>
            </NavItem>
            <NavItem active={!!matchPath(location.pathname, '/films/topview')}>
              <Link to='/films/topview'>Top View</Link>
            </NavItem>
            <NavItem active={!!matchPath(location.pathname, '/films/toplike')}>
              <Link to='/films/toplike'>Top Like</Link>
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
  display: flex;
  align-items: baseline;
  column-gap: 1em;
  flex-grow: 1;
`;

const NavList = styled.ul`
  list-style: none;
  display: flex;
  align-items: baseline;
  column-gap: 1em;

  @media screen and (max-width: 768px) {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    bottom: calc(100% - 100vh);
    transform: translateX(-100%);
    opacity: 0.5;
    transition: opacity 450ms, transform 450ms;
    background-color: var(--colors-primary-dark-2);
    padding: 1em 5%;
    flex-direction: column;
    row-gap: 1em;
    ${props => props.isMobileNavOpen && 'transform: translateX(0)'};
    ${props => props.isMobileNavOpen && 'opacity: 1'};
  }
`;

const NavItem = styled.li`
  --bottom-line-color: var(--colors-primary-dark-1);
  --active-color: var(--colors-primary);
  font-size: 1rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: -1px;
  color: var(--colors-primary-dark-2);

  :hover {
    color: var(--active-color);
  }

  ${props =>
    props.active && 'border-bottom: 3px solid var(--bottom-line-color)'};
  ${props => props.active && 'color: var(--active-color)'};

  @media screen and (max-width: 768px) {
    --active-color: var(--colors-secondary-dark);
    --bottom-line-color: var(--colors-secondary-translucent);
    color: var(--colors-secondary-dark);
    font-size: 1.25rem;
    width: 100%;
    text-align: center;
    border-bottom: 1px solid var(--bottom-line-color);

    :hover {
      color: var(--colors-secondary-dark);
      font-weight: 700;
    }

    ${props => props.active && 'font-weight: 700'};
  }
`;

const MobileNavButton = styled.span`
  display: none;
  font-size: 32px;
  color: var(--colors-primary);
  align-self: center;
  cursor: pointer;

  @media screen and (max-width: 768px) {
    display: block;
  }
`;

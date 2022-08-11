import { useEffect, useRef } from 'react';
import { useAPIContext } from '../../contexts/APIContext';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { StyledMenu, MenuItem } from './Header.styles';
import { useNavigate } from 'react-router-dom';

export default function Menu({ admin, onClose }) {
  const {
    setUser,
    API: { User },
  } = useAPIContext();
  const menuRef = useRef(null);
  const navigate = useNavigate();

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
      navigate('/');
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
        {admin && (
          <MenuItem>
            <Link to='/dashbroad'>Dashbroad</Link>
          </MenuItem>
        )}
        
        <MenuItem onClick={onSignOut}>Sign out</MenuItem>
      </ul>
    </StyledMenu>
  );
}

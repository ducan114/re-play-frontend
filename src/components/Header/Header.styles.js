import styled from 'styled-components';
import { motion } from 'framer-motion';
import { ProfileImage } from '../../styles/images';

export const StyledHeader = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 2;
  min-height: var(--header-height);
  background-color: var(--colors-secondary);
  padding: 10px 0;
`;

export const HeaderProfileImage = styled(ProfileImage)`
  border: 2px solid white;
  padding: 2px;
  cursor: pointer;
`;

export const StyledMenu = styled(motion.nav)`
  position: absolute;
  top: calc(100% + 3px);
  right: 3px;
  box-shadow: var(--shadow-border-big);
  background-color: var(--colors-primary);
  min-width: 200px;
  border-radius: 5px;
`;

export const MenuItem = styled.li`
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

export const Nav = styled.nav`
  display: flex;
  align-items: baseline;
  column-gap: 1em;
  flex-grow: 1;
`;

export const NavList = styled.ul`
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

export const NavItem = styled.li`
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

export const MobileNavButton = styled.span`
  display: none;
  font-size: 32px;
  color: var(--colors-primary);
  align-self: center;
  cursor: pointer;

  @media screen and (max-width: 768px) {
    display: block;
  }
`;

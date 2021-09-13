import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <NavLink className="navButton" to="/login">Log In</NavLink>
        <NavLink className="navButton" to="/signup">Sign Up</NavLink>
      </>
    );
  }

  return (
    <ul style={{listStyleType: 'none'}}>
      <li>
        <img className="logo" src="/images/logo.png" alt="Logo" />
      </li>
      <li>
        <NavLink className="navHome" exact to="/">Home</NavLink>
        {isLoaded && sessionLinks}
      </li>
    </ul>
  );
}

export default Navigation;

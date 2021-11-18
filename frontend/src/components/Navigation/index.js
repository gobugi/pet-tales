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
      <div className='divNavButtons'>
        <NavLink className="navButton" to="/signup">Sign Up</NavLink>
        <div className="navButton">|</div>
        <NavLink className="navButton" to="/login">Log In</NavLink>
      </div>
    );
  }

  return (
    <div className="navContainer">
      <NavLink to="/">
        <img className="logo" src="/images/logo.png" alt="Logo" />
      </NavLink>
      <div className="divHome">
        <NavLink className="navHome" exact to="/">Home</NavLink>
      </div>
      {isLoaded && sessionLinks}
    </div>
  );
}

export default Navigation;

import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import { Redirect } from 'react-router-dom';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  const redirectHome = (e) => {
    window.location.href = "/";
  }

  const logoutAndRedirect = (e) => {
    e.preventDefault();
    logout(e);
    redirectHome(e);
  }


  return (
    <>
      <i onClick={openMenu} className="fas fa-user-circle fa-3x"></i>
      {showMenu && (
        <div>
          <ul className="profile-dropdown" style={{listStyleType: 'none'}}>
            <li key={user.id}><a href={`/users/${user.id}`} style={{textDecoration: 'none'}}>{user.username}</a></li>
            <li key={user.email}>{user.email}</li>
            <li key={user.username}>
              <button key={`${user.id}logoutButton`} className="logoutButton" onClick={logoutAndRedirect}>
                <i key={`${user.id}logout`} className="fas fa-sign-out-alt"></i> Log Out
              </button>
            </li>
          </ul>
        </div>
      )}
    </>
  );
}




export default ProfileButton;

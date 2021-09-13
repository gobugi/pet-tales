import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';

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

  return (
    <>
      <i onClick={openMenu} className="fas fa-user-circle fa-3x"></i>
      {showMenu && (
        <div>
          <ul className="profile-dropdown" style={{listStyleType: 'none'}}>
            <li>{user.username}</li>
            <li>{user.email}</li>
            <li id="line">-</li>
            <li>
              <button className="logoutButton" onClick={logout}>
                <i className="fas fa-sign-out-alt"></i> Log Out
              </button>
            </li>
          </ul>
        </div>
      )}
    </>
  );
}

export default ProfileButton;

import React from 'react';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
export const NavBar = () => {
  const [navbar, setNavbar] = useState(false);
  const changeNavBackground = () => {
    if (window.scrollY >= 80) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };
  window.addEventListener('scroll', changeNavBackground);

  return (
    <div
      className={navbar ? 'header active' : 'header'}
      style={{
        display: 'flex',
        backgroundColor: '#292929',
        height: 50,
        justifyContent: 'space-between',
        alignItems: 'center',
        // zIndex: 999,
        // position: 'fixed',
        overflow: 'hidden',
        width: '100%',
        // justifyContent: 'space-around',
        // alignItems: 'center',
        // // height: 80px;
        // position: 'fixed',
        // z-index: 999,
        // overflow-y: hidden,
        // overflow-x: hidden,
      }}
    >
      <div className="nav-items" style={{ color: 'white' }}>
        <NavLink
          style={{
            color: 'white',
            textDecoration: 'none',
            fontSize: 18,
            padding: 10,
          }}
          to="/"
        >
          Default Call
        </NavLink>
        <NavLink
          style={{
            color: 'white',
            textDecoration: 'none',
            fontSize: 18,
            padding: 10,
          }}
          to="/defaultCall"
        >
          Direct Call
        </NavLink>
      </div>
    </div>
  );
};

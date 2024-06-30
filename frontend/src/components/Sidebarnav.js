import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './SideNav.css'; // Assuming you create this file for custom styles

const SideNav = () => {
  return (
    <div className="sidenav">
      <a href="#events">Events</a>
      <a href="#news">News</a>
      <a href="#user">User</a>
      <a href="#about">About</a>
      <a href="#logout">Logout</a>
    </div>
  );
};

export default SideNav;

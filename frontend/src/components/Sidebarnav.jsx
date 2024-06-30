import React from 'react';
import { GiTheater } from "react-icons/gi";
import { FaRegUserCircle } from "react-icons/fa";
import { IoIosChatboxes } from "react-icons/io";
import { MdLogout } from "react-icons/md";
import { Link } from 'react-router-dom';
import './Sidenav.css';

const SideNav = ({ id }) => {
  return (
    <div className="sidenav">
      <Link to={`/dashboard/events/${id}`} exact><GiTheater fill='#d60dab' className='nav-icons'/></Link>
      <Link to={`/dashboard/user/${id}`} exact><FaRegUserCircle fill='#d60dab' className='nav-icons' /></Link>
      <Link to={`/dashboard/chat/${id}`} exact><IoIosChatboxes fill='#d60dab' className='nav-icons' /></Link>
      <Link to={`/login`} exact><MdLogout fill='#d60dab' className='nav-icons' /></Link>
    </div>
  );
};

export default SideNav;

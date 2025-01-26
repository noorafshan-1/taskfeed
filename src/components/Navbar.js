

import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>TaskFeed</h1>
      <ul>
        <li><Link to="/">Login</Link></li>
        <li><Link to="/register">Register</Link></li>
        <li><Link to="/tasks">Tasks</Link></li>
        <li><Link to="/feed">Feed</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
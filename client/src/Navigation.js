import React from 'react';
import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <nav>
      <ul>
        <li><Link to="/">Product List</Link></li>
        <li><Link to="/create">Create Product</Link></li>
      </ul>
    </nav>
  );
}

export default Navigation;

// RoleBasedLink.js
import React from 'react';
import { Link } from 'react-router-dom';

const RoleBasedLink = ({ to, role, children }) => {
  const userRole = localStorage.getItem("role");
  if (userRole === role) {
    return <Link to={to}>{children}</Link>;
  }
  return null;
};

export default RoleBasedLink;

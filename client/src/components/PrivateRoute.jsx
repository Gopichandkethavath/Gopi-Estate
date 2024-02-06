import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

function PrivateRoute() {
  const {currentUser } = useSelector((state) => state.user); // Ensure this path matches your state structure

  // Properly return the conditional rendering
  return currentUser ? <Outlet /> : <Navigate to="/signup" />;
}

export default PrivateRoute;

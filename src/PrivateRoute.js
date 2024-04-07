import React from 'react';
import { Route, Navigate } from 'react-router-dom';

function PrivateRoute({ element: Element, ...rest }) {
  
  const isAuthenticated = !!localStorage.getItem('user');       // Stores true or false

  return (
    <Route
      {...rest}                     // used to pass all the remaining properties of an object as props to a component.
      
      element={isAuthenticated ? <Element /> : <Navigate to="/login" />}
    />
  );
}

export default PrivateRoute;

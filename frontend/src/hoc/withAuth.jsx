import React from 'react';
import { useAuth } from '../context/AuthContext';

const withAuth = (Component) => {
  return (props) => {
    const { user } = useAuth();

    if (!user) {
      return <div>Loading...</div>;
    }

    return <Component {...props} />;
  };
};

export default withAuth;
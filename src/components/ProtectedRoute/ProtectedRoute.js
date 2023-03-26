import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

// этот компонент принимает другой компонент в качестве пропса
// он также может взять неограниченное число пропсов и передать их новому компоненту
const ProtectedRoute = ({ children }) => {
  const currentUser = useContext(CurrentUserContext);
  console.log('currentUser._id on mount ProtectedRoute = ', currentUser._id);

  if (!currentUser._id) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;

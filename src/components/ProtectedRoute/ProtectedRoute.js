import React from 'react';
import { Navigate } from 'react-router-dom';
// import { CurrentUserContext } from '../../contexts/CurrentUserContext';

// этот компонент принимает другой компонент в качестве пропса
// он также может взять неограниченное число пропсов и передать их новому компоненту
const ProtectedRoute = ({ currentUser, children }) => {
  // const currentUser = useContext(CurrentUserContext);

  if (!currentUser._id) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;

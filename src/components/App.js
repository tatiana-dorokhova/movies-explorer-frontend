import React from 'react';
import { Route, Routes, Redirect } from 'react-router-dom';

import logoImage from '../images/header/header-logo.svg';
import Header from './Header/Header';
import Main from './Main/Main';

import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Footer from './Footer/Footer';

function App() {
  const [currentUser, setCurrentUser] = React.useState({});
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <div className="content">
          <Header src={logoImage} alt="О проекте" />
          <Routes>
            <Route path="/" element={<Main />} />
          </Routes>
          <Footer />
        </div>
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;

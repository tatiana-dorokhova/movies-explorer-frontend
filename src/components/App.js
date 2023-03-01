import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import logoImage from '../images/header/header-logo.svg';
import Header from './Header/Header';
import Main from './Main/Main';
import Movies from './Movies/Movies';
import SavedMovies from './SavedMovies/SavedMovies';

import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Footer from './Footer/Footer';

function App() {
  const [currentUser, setCurrentUser] = React.useState({});
  const [isLoggedIn, setIsLoggedIn] = React.useState(true);
  const [isShortFilmSelected, setIsShortFilmSelected] = React.useState(false);

  const handleToggleInSearchForm = () => {
    setIsShortFilmSelected(!isShortFilmSelected);
  };

  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <div className="content">
          <Header src={logoImage} alt="О проекте" isLoggedIn={isLoggedIn} />
          <Routes>
            <Route path="/" element={<Main />} />
            <Route
              path="/movies"
              element={
                isLoggedIn ? (
                  <Movies
                    isOn={isShortFilmSelected}
                    handleToggle={handleToggleInSearchForm}
                  />
                ) : (
                  <Navigate to="/sign-in" />
                )
              }
            />
            <Route
              path="/saved-movies"
              element={
                isLoggedIn ? <SavedMovies /> : <Navigate to="/sign-in" />
              }
            />
          </Routes>
          <Footer />
        </div>
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;

import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import headerLogoImage from '../images/header/header-logo.svg';
import burgerCloseButtonImage from '../images/header/header-burger-close-button.svg';

import Header from './Header/Header';
import Main from './Main/Main';
import Movies from './Movies/Movies';
import SavedMovies from './SavedMovies/SavedMovies';
import Register from './Register/Register';
import Login from './Login/Login';
import Profile from './Profile/Profile';
import PageNotFound from './PageNotFound/PageNotFound';

import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Footer from './Footer/Footer';

import {
  initialMovies,
  initialSavedMovies,
  initialCurrentUser,
} from '../utils/initialMovies';

function App() {
  const [currentUser, setCurrentUser] = React.useState(initialCurrentUser);
  const [isLoggedIn, setIsLoggedIn] = React.useState(true);
  const [isShortFilmSelected, setIsShortFilmSelected] = React.useState(false);
  const [isMovieSaved, setIsMovieSaved] = React.useState(false);

  const handleToggleInSearchForm = () => {
    setIsShortFilmSelected(!isShortFilmSelected);
  };

  const handleMovieSave = () => {
    console.log('handleMovieSave worked');
    setIsMovieSaved(!isMovieSaved);
  };

  const handleMovieRemove = () => {
    console.log('onMovieRemove worked');
  };

  function onLogin({ email, password }) {
    console.log('onLogin worked: email = ', email, ' password = ', password);
  }

  function onRegister({ email, password }) {
    console.log('onRegister worked: email = ', email, ' password = ', password);
  }

  function onChangeProfile({ name, email }) {
    console.log('onRegister worked: name = ', name, ' email = ', email);
  }

  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <div className="content">
          <Header
            logoSrc={headerLogoImage}
            logoAlt="О проекте"
            closeButtonSrc={burgerCloseButtonImage}
            closeButtonAlt="Закрыть меню"
            isLoggedIn={isLoggedIn}
          />
          <Routes>
            <Route
              path="/sign-up"
              element={<Register onAuth={onRegister} isNameRequired="true" />}
            />
            <Route path="/sign-in" element={<Login onAuth={onLogin} />} />
            <Route
              path="/profile"
              element={
                <Profile
                  onAuth={onChangeProfile}
                  title="Привет, currentUser.name!"
                  formName="profile"
                  inputName="Имя"
                  inputEmail="E-mail"
                  submitButtonName="Редактировать"
                  route="/sign-in"
                  profileSignoutButtonText="Выйти из аккаунта"
                />
              }
            />

            <Route path="/" element={<Main />} />
            <Route
              path="/movies"
              element={
                isLoggedIn ? (
                  <Movies
                    movies={initialMovies}
                    isOn={isShortFilmSelected}
                    onSwitcherToggle={handleToggleInSearchForm}
                    onMovieSave={handleMovieSave}
                  />
                ) : (
                  <Navigate to="/sign-in" replace />
                )
              }
            />
            <Route
              path="/saved-movies"
              element={
                isLoggedIn ? (
                  <SavedMovies
                    movies={initialSavedMovies}
                    isOn={isShortFilmSelected}
                    onSwitcherToggle={handleToggleInSearchForm}
                    onMovieRemove={handleMovieRemove}
                  />
                ) : (
                  <Navigate to="/sign-in" replace />
                )
              }
            />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
          <Footer />
        </div>
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;

import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute/ProtectedRoute';

// импорт изображений
import headerLogoImage from '../images/header/header-logo.svg';
import burgerCloseButtonImage from '../images/header/header-burger-close-button.svg';

// импорт компонентов
import Header from './Header/Header';
import Footer from './Footer/Footer';
import Main from './Main/Main';
import Movies from './Movies/Movies';
import SavedMovies from './SavedMovies/SavedMovies';
import Register from './Register/Register';
import Login from './Login/Login';
import Profile from './Profile/Profile';
import PageNotFound from './PageNotFound/PageNotFound';

import { CurrentUserContext } from '../contexts/CurrentUserContext';

import { initialCurrentUser } from '../utils/initialMovies';
import { api } from '../utils/MainApi';

function App() {
  // состояния пользователя
  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const navigate = useNavigate();

  // проверяем по куке, авторизован ли уже пользователь
  useEffect(() => {
    api
      .getUser()
      .then((userProfile) => {
        setIsLoggedIn(true);
        setCurrentUser(userProfile);
        navigate('/movies');
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function onRegister({ name, email, password }) {
    api
      .register({ name, email, password })
      .then((res) => {
        // если пришел корректный ответ,
        // перейти на страницу логина
        if (res) {
          onLogin({ email, password });
        }
      })
      // если в ответе ошибка,
      // остаться на странице регистрации
      .catch((err) => {
        console.log(err);
      });
  }

  function onLogin({ email, password }) {
    api
      .login({ email, password })
      .then((res) => {
        if (res) {
          setCurrentUser(res);
          setIsLoggedIn(true);
          navigate('/movies');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function onSignOut() {
    // почистить куку
    api
      .signout()
      .then(() => {
        setCurrentUser({});
        setIsLoggedIn(false);
        localStorage.clear();
        navigate('/');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function onEditProfile({ name, email }) {
    api
      .editUser({ name, email })
      .then((editedProfile) => {
        setCurrentUser(editedProfile);
        setIsLoggedIn(true);
      })
      .catch((err) => {
        console.log(err);
      });
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
            <Route path="/sign-up" element={<Register onAuth={onRegister} />} />

            <Route path="/sign-in" element={<Login onAuth={onLogin} />} />

            <Route path="/" element={<Main />} />

            <Route
              path="/profile"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <Profile
                    onEditProfile={onEditProfile}
                    title={`Привет, ${currentUser.name}!`}
                    formName="profile"
                    submitButtonName="Редактировать"
                    route="/sign-in"
                    profileSignoutButtonText="Выйти из аккаунта"
                    onSignOut={onSignOut}
                  />
                </ProtectedRoute>
              }
            />

            <Route
              path="/movies"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <Movies />
                </ProtectedRoute>
              }
            />

            <Route
              path="/saved-movies"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <SavedMovies />
                </ProtectedRoute>
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

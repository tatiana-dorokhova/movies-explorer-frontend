import React, { useState, useEffect } from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute/ProtectedRoute';

// импорт изображений
import headerLogoImage from '../images/header/header-logo.svg';
import burgerCloseButtonImage from '../images/header/header-burger-close-button.svg';
import okImage from '../images/common/InfoTooltip-Ok.svg';
import failImage from '../images/common/InfoTooltip-Fail.svg';

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
import InfoTooltip from './InfoTooltip/InfoTooltip';

import { CurrentUserContext } from '../contexts/CurrentUserContext';

import { api } from '../utils/MainApi';
import Preloader from './Preloader/Preloader';

function App() {
  // состояния пользователя
  const [currentUser, setCurrentUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isActionSuccess, setIsActionSuccess] = useState(true);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);

  const navigate = useNavigate();

  // проверяем по куке, авторизован ли уже пользователь
  useEffect(() => {
    api
      .getUser()
      .then((userProfile) => {
        setCurrentUser(userProfile);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
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
        localStorage.clear();
        setCurrentUser({});
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
        setIsActionSuccess(true);
        setIsInfoTooltipOpen(true);
      })
      .catch((err) => {
        setIsActionSuccess(false);
        setIsInfoTooltipOpen(true);
        console.log(err);
      });
  }

  function closeTooltip() {
    setIsInfoTooltipOpen(false);
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
          />
          {isLoading ? (
            <Preloader />
          ) : (
            <Routes>
              <Route
                path="/sign-up"
                // если пользователь авторизован, отправлять его на страницу фильмов
                element={
                  !currentUser._id ? (
                    <Register onAuth={onRegister} />
                  ) : (
                    <Navigate to="/movies" replace />
                  )
                }
              />

              <Route
                path="/sign-in"
                // если пользователь авторизован, отправлять его на страницу фильмов
                element={
                  !currentUser._id ? <Login onAuth={onLogin} /> : <Navigate to="/movies" replace />
                }
              />

              <Route path="/" element={<Main />} />

              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile
                      onEditProfile={onEditProfile}
                      title={`Привет, ${currentUser.name}!`}
                      formName="profile"
                      submitButtonName="Редактировать"
                      profileSignoutButtonText="Выйти из аккаунта"
                      onSignOut={onSignOut}
                    />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/movies"
                element={
                  <ProtectedRoute>
                    <Movies />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/saved-movies"
                element={
                  <ProtectedRoute>
                    <SavedMovies />
                  </ProtectedRoute>
                }
              />

              <Route path="*" element={<PageNotFound />} />
            </Routes>
          )}
          <Footer />

          <InfoTooltip
            isOpen={isInfoTooltipOpen}
            onClose={closeTooltip}
            isActionSuccess={isActionSuccess}
            okImage={okImage}
            failImage={failImage}
            successMessage="Изменения успешно сохранены"
            failMessage="На сервере произошла ошибка"
          ></InfoTooltip>
        </div>
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;

import React from 'react';
import { Route, Routes } from 'react-router-dom';
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

//импорт методов работы с апи
import { getAllMovies } from '../utils/MoviesApi';

import { CurrentUserContext } from '../contexts/CurrentUserContext';

import { initialSavedMovies, initialCurrentUser } from '../utils/initialMovies';

function App() {
  // состояния пользователя
  const [currentUser, setCurrentUser] = React.useState(initialCurrentUser);
  const [isLoggedIn, setIsLoggedIn] = React.useState(true);

  // состояния страницы фильмов и сохраненных фильмов
  const [moviesList, setMoviesList] = React.useState([]);
  const [isMovieSaved, setIsMovieSaved] = React.useState(false);

  const handleSearch = ({ searchRequest, selectShortFilms }) => {
    // вызвать прелоадер
    getAllMovies()
      .then((movies) => {
        console.log(movies);
        localStorage.setItem('lastSearchRequest', searchRequest);
        localStorage.setItem('selectShortFilms', selectShortFilms);
        localStorage.setItem('movies', JSON.stringify(movies));
        setMoviesList(movies);
      })
      .catch((err) => {
        // вызвать тултип с ошибкой err
        console.log(err);
      });
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
            <Route path="/sign-up" element={<Register onAuth={onRegister} />} />

            <Route path="/sign-in" element={<Login onAuth={onLogin} />} />

            <Route path="/" element={<Main />} />

            <Route
              path="/profile"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
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
                </ProtectedRoute>
              }
            />

            <Route
              path="/movies"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <Movies
                    movies={moviesList}
                    onMovieSave={handleMovieSave}
                    onSearchSubmit={handleSearch}
                  />
                </ProtectedRoute>
              }
            />

            <Route
              path="/saved-movies"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <SavedMovies movies={initialSavedMovies} onMovieRemove={handleMovieRemove} />
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

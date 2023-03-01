import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import logoImage from '../images/header/header-logo.svg';
import Header from './Header/Header';
import Main from './Main/Main';
import Movies from './Movies/Movies';
import SavedMovies from './SavedMovies/SavedMovies';

import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Footer from './Footer/Footer';

const initialMovies = [
  {
    _id: 1,
    name: 'film1',
    link: 'https://faunistics.com/wp-content/uploads/2021/01/4.jpg',
    duration: '1m 20s',
  },
  {
    _id: 2,
    name: 'film2',
    link: 'https://petzona.ru/wp-content/uploads/2019/02/sapsan-unikalnaya-ptitsa-2.jpg',
    duration: '2m 05s',
  },
  {
    _id: 3,
    name: 'film3',
    link: 'https://sun1-24.userapi.com/c855120/v855120856/1c6bde/Y2FpFd5NZUA.jpg',
    duration: '2h 48m 54s',
  },
  {
    _id: 4,
    name: 'film4',
    link: 'https://sun1-24.userapi.com/c855120/v855120856/1c6bde/Y2FpFd5NZUA.jpg',
    duration: '2h 48m 54s',
  },
  {
    _id: 5,
    name: 'film5',
    link: 'https://sun1-24.userapi.com/c855120/v855120856/1c6bde/Y2FpFd5NZUA.jpg',
    duration: '2h 48m 54s',
  },
  {
    _id: 6,
    name: 'film6',
    link: 'https://sun1-24.userapi.com/c855120/v855120856/1c6bde/Y2FpFd5NZUA.jpg',
    duration: '2h 48m 54s',
  },
];

function App() {
  const [currentUser, setCurrentUser] = React.useState({});
  const [isLoggedIn, setIsLoggedIn] = React.useState(true);
  const [isShortFilmSelected, setIsShortFilmSelected] = React.useState(false);
  const [isMovieSaved, setIsMovieSaved] = React.useState(false);

  const handleToggleInSearchForm = () => {
    setIsShortFilmSelected(!isShortFilmSelected);
  };

  const handleMovieSave = () => {
    setIsMovieSaved(!isMovieSaved);
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
                    movies={initialMovies}
                    isOn={isShortFilmSelected}
                    onSwitcherToggle={handleToggleInSearchForm}
                    onMovieSave={handleMovieSave}
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

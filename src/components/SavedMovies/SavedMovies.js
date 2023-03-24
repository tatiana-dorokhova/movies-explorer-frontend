// компонент страницы с сохранёнными карточками фильмов
import './SavedMovies.css';

import React, { useState, useEffect } from 'react';
import { api } from '../../utils/MainApi';
import MoviesSearchErrors from '../MoviesNotFound/MoviesSearchErrors';

import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { findMoviesBySearchQuery } from '../../utils/MoviesHandler';

function SavedMovies(props) {
  const [savedMovies, setSavedMovies] = useState([]);
  const [lastSearchQuery, setLastSearchQuery] = useState('');
  const [isShortFilmsOn, setIsShortFilmsOn] = useState(false);

  useEffect(() => {
    // при монтировании компонента достать данные из local storage
    const initialSearchQuery = localStorage.getItem('searchQuery');
    const initialShortFilms = localStorage.getItem('shortFilms');
    // если данные есть, записать их в переменные состояния
    if (initialSearchQuery) {
      setLastSearchQuery(JSON.parse(initialSearchQuery));
    }
    if (initialShortFilms) {
      setIsShortFilmsOn(JSON.parse(initialShortFilms));
    }
  }, []);

  useEffect(() => {
    api
      .getSavedCards()
      .then((savedMovies) => {
        setSavedMovies(savedMovies);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleChangeSavedMovies(movies) {
    setSavedMovies(movies);
  }

  const handleSearch = ({ searchQuery, shortFilms }) => {
    // записать в localStorage фильтр и значение свитчера
    localStorage.setItem('searchQuery', JSON.stringify(searchQuery));
    localStorage.setItem('shortFilms', JSON.stringify(shortFilms));

    // поменять переменные состояния
    setLastSearchQuery(searchQuery);
    setIsShortFilmsOn(shortFilms);
  };

  const moviesBySearchQuery = findMoviesBySearchQuery({
    movies: savedMovies,
    searchQuery: lastSearchQuery,
    shortFilms: isShortFilmsOn,
  });

  return (
    <>
      <SearchForm
        onSubmit={handleSearch}
        lastSearchQuery={lastSearchQuery}
        isShortFilmsOn={isShortFilmsOn}
      />
      {moviesBySearchQuery.length !== 0 && (
        <MoviesCardList
          movies={moviesBySearchQuery}
          onChangeSavedMovies={handleChangeSavedMovies}
        />
      )}

      {moviesBySearchQuery.length === 0 && lastSearchQuery && (
        <MoviesSearchErrors errorText="Ничего не найдено" />
      )}
    </>
  );
}

export default SavedMovies;

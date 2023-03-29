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

  const [filteredMovies, setFilteredMovies] = useState([]);

  useEffect(() => {
    api
      .getSavedCards()
      .then((savedMovies) => {
        setSavedMovies(savedMovies);
        setFilteredMovies(savedMovies);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    setFilteredMovies(
      findMoviesBySearchQuery({
        movies: savedMovies,
        searchQuery: lastSearchQuery,
        shortFilms: isShortFilmsOn,
      }),
    );
  }, [savedMovies, lastSearchQuery, isShortFilmsOn]);

  function handleChangeSavedMovies(movies) {
    setSavedMovies(movies);
  }

  // при поиске не меняем состояние переменных в local storage
  const handleSearch = ({ searchQuery, shortFilms }) => {
    setFilteredMovies(
      findMoviesBySearchQuery({
        movies: savedMovies,
        searchQuery: searchQuery,
        shortFilms: shortFilms,
      }),
    );
  };

  return (
    <>
      <SearchForm
        onSubmit={handleSearch}
        lastSearchQuery={lastSearchQuery}
        isShortFilmsOn={isShortFilmsOn}
      />
      {filteredMovies.length !== 0 && (
        <MoviesCardList movies={filteredMovies} onChangeSavedMovies={handleChangeSavedMovies} />
      )}

      {filteredMovies.length === 0 && lastSearchQuery && (
        <MoviesSearchErrors errorText="Ничего не найдено" />
      )}
    </>
  );
}

export default SavedMovies;

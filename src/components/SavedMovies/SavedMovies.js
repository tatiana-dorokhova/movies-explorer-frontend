// компонент страницы с сохранёнными карточками фильмов
import './SavedMovies.css';
import { initialSavedMovies } from '../../utils/initialMovies';

import React, { useState, useEffect } from 'react';
import { api } from '../../utils/MainApi';

import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function SavedMovies(props) {
  const [savedMovies, setSavedMovies] = useState([]);

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

  return (
    <>
      <SearchForm />
      <MoviesCardList movies={savedMovies} onChangeSavedMovies={handleChangeSavedMovies} />
    </>
  );
}

export default SavedMovies;

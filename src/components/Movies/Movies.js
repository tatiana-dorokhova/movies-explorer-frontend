// компонент со ссылками на другие проекты
import './Movies.css';

import { initialSavedMovies } from '../../utils/initialMovies';

import React, { useEffect, useState } from 'react';

import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import MoviesSearchErrors from '../MoviesNotFound/MoviesSearchErrors';
import LoadButton from '../LoadButton/LoadButton';

import { getAllMovies } from '../../utils/MoviesApi';
import { api } from '../../utils/MainApi';
import { findMoviesBySearchQuery } from '../../utils/MoviesHandler';

function Movies(props) {
  const [moviesList, setMoviesList] = useState([]);
  const [lastSearchQuery, setLastSearchQuery] = useState('');
  const [isShortFilmsOn, setIsShortFilmsOn] = useState(false);

  const [savedMovies, setSavedMovies] = useState([]);

  const [errorWhileSearching, setErrorWhileSearching] = useState(false);

  // для отображения и скрытия прелоадера
  const [isDataLoading, setIsDataLoading] = useState(false);

  useEffect(() => {
    // при монтировании компонента достать данные из local storage
    const initialMovies = localStorage.getItem('movies');
    const initialSearchQuery = localStorage.getItem('searchQuery');
    const initialShortFilms = localStorage.getItem('shortFilms');
    // если данные есть, записать их в переменные состояния
    if (initialMovies) {
      setMoviesList(JSON.parse(initialMovies));
    }
    if (initialSearchQuery) {
      setLastSearchQuery(JSON.parse(initialSearchQuery));
    }
    if (initialShortFilms) {
      setIsShortFilmsOn(JSON.parse(initialShortFilms));
    }
  }, []);

  // для правильной отрисовки иконки сохраненного фильма в роуте /movies
  // достать список сохраненных фильмов из MainApi, чтобы отрисовываться по movie.id
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
    // загрузить все фильмы, если в local storage пусто
    if (!localStorage.getItem('movies')) {
      // вызвать прелоадер
      setIsDataLoading(true);
      // скинуть состояние ошибки (она может возникать только при загрузке с бэка)
      setErrorWhileSearching(false);

      getAllMovies()
        .then((movies) => {
          // положить в localStorage список загруженных фильмов
          localStorage.setItem('movies', JSON.stringify(movies));
          setMoviesList(movies); // setMoviesList is async operation
        })
        .catch(() => {
          setErrorWhileSearching(true);
        })
        .finally(() => {
          // убрать прелоадер
          setIsDataLoading(false);
        });
    }

    // записать в localStorage фильтр и значение свитчера
    localStorage.setItem('searchQuery', JSON.stringify(searchQuery));
    localStorage.setItem('shortFilms', JSON.stringify(shortFilms));

    // поменять переменные состояния
    setLastSearchQuery(searchQuery);
    setIsShortFilmsOn(shortFilms);
  };

  const moviesBySearchQuery = findMoviesBySearchQuery({
    movies: moviesList,
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
      {/* блок с карточками отображается, если: 
       1. не крутится прелоадер 
       2. список карточек не пустой
       3. не возникло ошибки при поиске
       */}
      {!isDataLoading && moviesBySearchQuery.length !== 0 && !errorWhileSearching && (
        <MoviesCardList
          movies={moviesBySearchQuery}
          savedMovies={savedMovies}
          onChangeSavedMovies={handleChangeSavedMovies}
        />
      )}

      {!isDataLoading && moviesBySearchQuery.length === 0 && lastSearchQuery && (
        <MoviesSearchErrors errorText="Ничего не найдено" />
      )}

      {!isDataLoading && errorWhileSearching && (
        <MoviesSearchErrors
          errorText="Во время запроса произошла ошибка. Возможно, проблема с соединением
          или сервер недоступен. Подождите немного и попробуйте ещё раз."
        />
      )}

      {isDataLoading && <Preloader />}

      <LoadButton startMoviesCardCount={moviesBySearchQuery.length} />
    </>
  );
}

export default Movies;

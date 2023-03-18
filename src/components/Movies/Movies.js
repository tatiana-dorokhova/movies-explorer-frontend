// компонент со ссылками на другие проекты
import './Movies.css';

import { initialSavedMovies } from '../../utils/initialMovies';

import React, { useEffect } from 'react';

import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import MoviesSearchErrors from '../MoviesNotFound/MoviesSearchErrors';
import LoadButton from '../LoadButton/LoadButton';

import { getAllMovies } from '../../utils/MoviesApi';
import { findFilmsBySearchQuery } from '../../utils/MoviesHandler';

function Movies(props) {
  const [moviesList, setMoviesList] = React.useState([]);
  const [lastSearchQuery, setLastSearchQuery] = React.useState('');
  const [isShortFilmsOn, setIsShortFilmsOn] = React.useState(false);

  const [savedMovies, setSavedMovies] = React.useState([]);

  const [isNothingFound, setIsNothingFound] = React.useState(false);
  const [errorWhileSearching, setErrorWhileSearching] = React.useState(false);

  // для отображения и скрытия прелоадера
  const [isDataLoading, setIsDataLoading] = React.useState(false);

  useEffect(() => {
    // при монтировании компонента достать данные из local storage
    const initialMovies = localStorage.getItem('movies');
    const initialSearchQuery = localStorage.getItem('searchQuery');
    const initialShortFilms = localStorage.getItem('shortFilms');
    // если данные есть, записать их в переменные состояния
    if (initialMovies) {
      console.log('initialMovies sind da');
      setMoviesList(JSON.parse(initialMovies));
    }
    if (lastSearchQuery) {
      setLastSearchQuery(JSON.parse(initialSearchQuery));
    }
    if (isShortFilmsOn) {
      setIsShortFilmsOn(JSON.parse(initialShortFilms));
    }
  }, []);

  console.log(
    'moviesList = ',
    moviesList,
    'lastSearchQuery = ',
    lastSearchQuery,
    'isShortFilmsOn = ',
    isShortFilmsOn,
  );

  // для правильной отрисовки иконки сохраненного фильма в роуте /movies
  // достать список сохраненных фильмов из MainApi, чтобы отрисовываться по movie.id
  useEffect(() => {
    setSavedMovies(initialSavedMovies);
  }, []);

  // отобрать только фильмы, подходящие под строку поиска
  const filmsBySearchQuery = findFilmsBySearchQuery({
    films: moviesList,
    searchQuery: lastSearchQuery,
  });

  const handleSearch = ({ searchQuery, shortFilms }) => {
    // записать в localStorage фильтр и значение свитчера
    localStorage.setItem('searchQuery', JSON.stringify(searchQuery));
    localStorage.setItem('shortFilms', JSON.stringify(shortFilms));
    // поменять переменные состояния
    setLastSearchQuery(searchQuery);
    setIsShortFilmsOn(shortFilms);
    // скинуть состояние пустого результата
    setIsNothingFound(false);

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
          setMoviesList(movies);
        })
        .catch(() => {
          setErrorWhileSearching(true);
        })
        .finally(() => {
          // убрать прелоадер
          setIsDataLoading(false);
        });
    }

    // если ничего не найдено, поменять переменную состояния
    if (filmsBySearchQuery.length === 0) {
      setIsNothingFound(true);
    }
  };

  const handleMovieSave = () => {
    console.log('handleMovieSave worked');
  };

  const handleMovieRemove = () => {
    console.log('onMovieRemove worked');
  };

  return (
    <>
      <SearchForm onSubmit={handleSearch} />
      {/* блок с карточками отображается, если: 
       1. не крутится прелоадер 
       2. список карточек не пустой
       3. не возникло ошибки при поиске
       */}
      {!isDataLoading && !isNothingFound && !errorWhileSearching && (
        <MoviesCardList
          movies={filmsBySearchQuery}
          savedMovies={savedMovies.map((element) => element.movieId)}
          onMovieSave={handleMovieSave}
          onMovieRemove={handleMovieRemove}
        />
      )}

      {isNothingFound && <MoviesSearchErrors errorText="Ничего не найдено" />}

      {errorWhileSearching && (
        <MoviesSearchErrors
          errorText="Во время запроса произошла ошибка. Возможно, проблема с соединением
          или сервер недоступен. Подождите немного и попробуйте ещё раз."
        />
      )}

      {isDataLoading && <Preloader />}

      <LoadButton loadButtonName="Ещё" />
    </>
  );
}

export default Movies;

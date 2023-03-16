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
      setMoviesList(JSON.parse(initialMovies));
    }
    if (lastSearchQuery) {
      setLastSearchQuery(JSON.parse(initialSearchQuery));
    }
    if (isShortFilmsOn) {
      setIsShortFilmsOn(JSON.parse(initialShortFilms));
    }
  }, []);

  // для правильной отрисовки иконки сохраненного фильма в роуте /movies
  // достать список сохраненных фильмов из MainApi, чтобы отрисовываться по movie.id
  useEffect(() => {
    setSavedMovies(initialSavedMovies);
  }, []);

  // поиск фильмов по заданному searchQuery
  const findFilmsBySearchQuery = ({ films, searchQuery }) => {
    console.log('films = ', films);
    console.log('searchQuery = ', searchQuery);

    return films.filter((film) => {
      return (
        film.nameEN.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1 ||
        film.nameRU.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1 ||
        film.director.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1
      );
    });
  };

  const handleSearch = ({ searchQuery, shortFilms }) => {
    // убрать ошибку, если она была на предыдущем поиске
    setErrorWhileSearching(false);
    // убрать сообщение о том, что ничего не найдено
    setIsNothingFound(false);
    // вызвать прелоадер
    setIsDataLoading(true);
    // загрузить все фильмы
    getAllMovies()
      .then((movies) => {
        // отобрать только фильмы, подходящие под строку поиска
        const filmsBySearchQuery = findFilmsBySearchQuery({ films: movies, searchQuery });
        // если ничего не найдено, поменять переменную состояния
        if (filmsBySearchQuery.length === 0) {
          console.log('filmsBySearchQuery.length === 0');
          setIsNothingFound(true);
        }
        // положить в localStorage
        localStorage.setItem('searchQuery', JSON.stringify(searchQuery));
        localStorage.setItem('shortFilms', JSON.stringify(shortFilms));
        localStorage.setItem('movies', JSON.stringify(filmsBySearchQuery));
        // поменять переменные состояния
        setMoviesList(filmsBySearchQuery);
        setLastSearchQuery(searchQuery);
      })
      .catch(() => {
        setErrorWhileSearching(true);
      })
      .finally(() => {
        // убрать прелоадер
        setIsDataLoading(false);
      });
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
          movies={moviesList}
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

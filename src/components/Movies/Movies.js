// компонент со ссылками на другие проекты
import './Movies.css';

import React, { useEffect } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
// import Preloader from '../Preloader/Preloader';
import { getAllMovies } from '../../utils/MoviesApi';

function Movies(props) {
  const [moviesList, setMoviesList] = React.useState([]);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [isShortFilmsOn, setIsShortFilmsOn] = React.useState(false);

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
    if (searchQuery) {
      setSearchQuery(JSON.parse(initialSearchQuery));
    }
    if (isShortFilmsOn) {
      setIsShortFilmsOn(JSON.parse(initialShortFilms));
    }
  });

  const handleSearch = ({ searchQuery, shortFilms }) => {
    // вызвать прелоадер
    getAllMovies()
      .then((movies) => {
        // сделать выборку по реквесту, полученный результат положить в хранилище
        console.log(movies);
        localStorage.setItem('searchQuery', JSON.stringify(searchQuery));
        localStorage.setItem('shortFilms', JSON.stringify(shortFilms));
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
  };

  const handleMovieRemove = () => {
    console.log('onMovieRemove worked');
  };

  return (
    <>
      <SearchForm onSubmit={handleSearch} />
      {/* сюда положить условие, что рисовать этот блок только если карточки есть */}
      <MoviesCardList
        movies={moviesList}
        onMovieSave={handleMovieSave}
        onMovieRemove={handleMovieRemove}
      />
      {/* <Preloader /> */}
    </>
  );
}

export default Movies;

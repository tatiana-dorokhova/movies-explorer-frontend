// компонент со ссылками на другие проекты
import './Movies.css';

import React, { useEffect, useState } from 'react';

import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import MoviesSearchErrors from '../MoviesNotFound/MoviesSearchErrors';
import LoadButton from '../LoadButton/LoadButton';

import { getAllMovies } from '../../utils/MoviesApi';
import { api } from '../../utils/MainApi';
import { findMoviesBySearchQuery } from '../../utils/MoviesHandler';
import {
  START_VALUE_FULL_DISPLAY,
  ITEMS_TO_ADD_FULL_DISPLAY,
  START_VALUE_TABLET,
  START_VALUE_MOBILE,
  ITEMS_TO_ADD_MOBILE,
} from '../../utils/constants';

function Movies(props) {
  // все фильмы, полученные с сервера
  const [moviesList, setMoviesList] = useState([]);
  const [lastSearchQuery, setLastSearchQuery] = useState('');
  const [isShortFilmsOn, setIsShortFilmsOn] = useState(false);
  // все сохраненные фильмы из нашей БД
  const [savedMovies, setSavedMovies] = useState([]);

  //состояние при ошибке запроса к серверу
  const [errorWhileSearching, setErrorWhileSearching] = useState(false);

  // состояние для отображения и скрытия прелоадера
  const [isDataLoading, setIsDataLoading] = useState(false);

  // состояние для отображения нужного количества карточек
  const [itemsCount, setItemsCount] = useState({ startValue: 0, addItemsCount: 0 });

  const [isShowMoreButtonVisible, setIsShowMoreButtonVisible] = useState(true);
  // все найденные по фильтрам фильмы
  const [filteredMovies, setFilteredMovies] = useState([]);
  // фильмы для рендера в MoviesCardList
  const [moviesToShow, setMoviesToShow] = useState([]);

  useEffect(() => {
    // вычислить текущую ширину экрана и установить состояния в зависимости от нее
    const resizeWidthCount = () => {
      if (window.innerWidth >= 1280) {
        setItemsCount({
          startValue: START_VALUE_FULL_DISPLAY,
          addItemsCount: ITEMS_TO_ADD_FULL_DISPLAY,
        });
      } else if (window.innerWidth >= 636) {
        setItemsCount({ startValue: START_VALUE_TABLET, addItemsCount: ITEMS_TO_ADD_MOBILE });
      } else {
        setItemsCount({ startValue: START_VALUE_MOBILE, addItemsCount: ITEMS_TO_ADD_MOBILE });
      }
    };

    // вызвать функцию
    resizeWidthCount();

    // повесить листнер на изменение ширины экрана
    window.addEventListener('resize', resizeWidthCount);
    // удалить листнер при размонтировании
    return () => {
      window.removeEventListener('resize', resizeWidthCount());
    };
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

  useEffect(() => {
    // при монтировании компонента достать данные из local storage
    const initialMovies = localStorage.getItem('movies');
    const initialSearchQuery = localStorage.getItem('searchQuery');
    const initialShortFilms = localStorage.getItem('shortFilms');
    // если данные есть, записать их в переменные состояния
    if (initialMovies) {
      const parsedInitialMovies = JSON.parse(initialMovies);
      setMoviesList(parsedInitialMovies);
    }
    if (initialSearchQuery) {
      setLastSearchQuery(JSON.parse(initialSearchQuery));
    }
    if (initialShortFilms) {
      setIsShortFilmsOn(JSON.parse(initialShortFilms));
    }
  }, []);

  useEffect(() => {
    const filteredMovies = findMoviesBySearchQuery({
      movies: moviesList,
      searchQuery: lastSearchQuery,
      shortFilms: isShortFilmsOn,
    });
    setFilteredMovies(filteredMovies);
  }, [moviesList, lastSearchQuery, isShortFilmsOn]);

  useEffect(() => {
    setMoviesToShow(filteredMovies.slice(0, itemsCount.startValue));
  }, [filteredMovies, itemsCount.startValue]);

  // показывать кнопку Еще
  useEffect(() => {
    if (filteredMovies.length >= itemsCount.startValue) {
      setIsShowMoreButtonVisible(true);
    } else setIsShowMoreButtonVisible(false);
  }, [filteredMovies, itemsCount.startValue]);

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

    const moviesBySearchQuery = findMoviesBySearchQuery({
      movies: moviesList,
      searchQuery: searchQuery,
      shortFilms: shortFilms,
    });

    // if (moviesBySearchQuery.length >= 3) {
    //   setIsShowMoreButtonVisible(true);
    // } else setIsShowMoreButtonVisible(false);

    setFilteredMovies(moviesBySearchQuery);
    setMoviesToShow(moviesBySearchQuery.slice(0, itemsCount.startValue));
  };

  const handleShowMoreButton = () => {
    const addedMovies = filteredMovies.slice(0, moviesToShow.length + itemsCount.addItemsCount);
    setMoviesToShow(addedMovies);
    // не отображать кнопку Ещё, когда отображаемый массив станет >= исходному
    if (addedMovies.length >= filteredMovies.length) {
      setIsShowMoreButtonVisible(false);
    } else setIsShowMoreButtonVisible(true);
  };

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
      {!isDataLoading && moviesToShow.length !== 0 && !errorWhileSearching && (
        <>
          <MoviesCardList
            movies={moviesToShow}
            savedMovies={savedMovies}
            onChangeSavedMovies={handleChangeSavedMovies}
          />
          <LoadButton
            isButtonVisible={isShowMoreButtonVisible}
            onShowMoreButton={handleShowMoreButton}
          />
        </>
      )}

      {!isDataLoading && moviesToShow.length === 0 && lastSearchQuery && (
        <MoviesSearchErrors errorText="Ничего не найдено" />
      )}

      {!isDataLoading && errorWhileSearching && (
        <MoviesSearchErrors
          errorText="Во время запроса произошла ошибка. Возможно, проблема с соединением
          или сервер недоступен. Подождите немного и попробуйте ещё раз."
        />
      )}

      {isDataLoading && <Preloader />}
    </>
  );
}

export default Movies;

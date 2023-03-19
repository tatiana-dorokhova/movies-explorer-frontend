// компонент одной карточки фильма
import './MoviesCard.css';
import { useLocation } from 'react-router-dom';

import React from 'react';

import { EXTERNAL_API_URL } from '../../utils/constants';
import { formatDuration } from '../../utils/MoviesHandler';

function MoviesCard(props) {
  const location = useLocation();

  // для отображения по роуту /movies делаем признак, сохранен фильм или нет
  // для этого ищем id фильма в списке сохраненных фильмов
  // savedMovies - это массив movieId сохраненных фильмов
  const movieButtonClassName = () => {
    if (location.pathname === '/movies') {
      const isSavedByThisUser = props.savedMovies.some((i) => i === props.movie.id);

      return `movies-card__button${isSavedByThisUser ? '' : ' movies-card__button_marked'}`;
    }
    return 'movies-card__button movies-card__button_remove';
  };

  function handleSaveButtonClick() {
    props.onMovieSave(props.movie);
  }

  function handleRemoveButtonClick() {
    props.onMovieRemove(props.movie);
  }

  return (
    <article className="movies-card">
      <div className="movies-card__header">
        <div className="movies-card__info">
          <h3 className="movies-card__film-name">{props.movie.nameRU}</h3>
          <div className="movies-card__film-duration">{formatDuration(props.movie.duration)}</div>
        </div>
        <button
          className={movieButtonClassName()}
          type="button"
          onClick={
            location.pathname === '/movies' ? handleSaveButtonClick : handleRemoveButtonClick
          }
        ></button>
      </div>
      <a
        className="movies-card__image-container"
        href={props.movie.trailerLink}
        target="_blank"
        rel="noreferrer"
      >
        <img
          className="movies-card__image"
          src={`${EXTERNAL_API_URL}${props.movie.image.url}`}
          alt={props.movie.nameRU}
        />
      </a>
    </article>
  );
}

export default MoviesCard;

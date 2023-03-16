// компонент одной карточки фильма
import './MoviesCard.css';
import { useLocation } from 'react-router-dom';

import React from 'react';

function MoviesCard(props) {
  const location = useLocation();

  // для отображения по роуту /movies делаем признак, сохранен фильм или нет
  // для этого ищем id фильма в списке сохраненных фильмов
  const isSavedByThisUser = props.savedMovies.some((i) => i === props.movie.id);

  const moviesButtonClassName = `movies-card__button${
    isSavedByThisUser ? '' : ' movies-card__button_marked'
  }`;

  const savedMoviesButtonClassName = 'movies-card__button movies-card__button_remove';

  const movieButtonClassName =
    location.pathname === '/movies' ? moviesButtonClassName : savedMoviesButtonClassName;

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
          <div className="movies-card__film-duration">{props.movie.duration}</div>
        </div>
        <button
          className={movieButtonClassName}
          type="button"
          onClick={
            location.pathname === '/movies' ? handleSaveButtonClick : handleRemoveButtonClick
          }
        ></button>
      </div>
      <img
        className="movies-card__image"
        src={props.movie.thumbnail}
        alt={props.movie.name}
        // onClick={handleImageClick}
      />
    </article>
  );
}

export default MoviesCard;

// компонент одной карточки фильма
import './MoviesCard.css';
import { useLocation } from 'react-router-dom';

import React from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function MoviesCard(props) {
  const location = useLocation();

  const currentUser = React.useContext(CurrentUserContext);

  // для отображения по роуту /movies делаем признак, сохранен фильм или нет
  // для этого из local storage нужно забрать айдишники уже сохраненных пользователем фильмов
  const isSavedByThisUser = props.movie.owner._id === currentUser._id;

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

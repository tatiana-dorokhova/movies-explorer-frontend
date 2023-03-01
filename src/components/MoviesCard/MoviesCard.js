// компонент одной карточки фильма
import './MoviesCard.css';

import React from 'react';
// import { CurrentUserContext } from '../contexts/CurrentUserContext';

function MoviesCard(props) {
  //   const currentUser = React.useContext(CurrentUserContext);

  function handleSaveButtonClick() {
    props.onMovieSave(props.card);
  }

  return (
    <article className="movies-card">
      <div className="movies-card__header">
        <div className="movies-card__info">
          <h3 className="movies-card__film-name">{props.card.name}</h3>
          <div className="movies-card__film-duration">
            {props.card.duration}
          </div>
        </div>
        <button
          className="movies-card__save-button"
          type="button"
          onClick={handleSaveButtonClick}
        ></button>
      </div>
      <img
        className="movies-card__image"
        src={props.card.link}
        alt={props.card.name}
        // onClick={handleClick}
      />
    </article>
  );
}

export default MoviesCard;

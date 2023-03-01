// компонент, который управляет отрисовкой карточек фильмов на страницу и их количеством
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList(props) {
  return (
    <section className="movies-list" aria-label="movies-cards">
      {props.movies.map((movie) => {
        return (
          <MoviesCard
            key={movie._id}
            card={movie}
            onMovieSave={props.onMovieSave}
          />
        );
      })}
    </section>
  );
}

export default MoviesCardList;

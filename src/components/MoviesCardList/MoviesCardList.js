// компонент, который управляет отрисовкой карточек фильмов на страницу и их количеством
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import LoadButton from '../LoadButton/LoadButton';

function MoviesCardList(props) {
  return (
    <section className="movies-list" aria-label="movies-cards">
      {props.movies.map((movie) => {
        return (
          <>
            <MoviesCard
              key={movie._id}
              movie={movie}
              onMovieSave={props.onMovieSave}
              onMovieRemove={props.onMovieRemove}
            />
            <LoadButton loadButtonName="Ещё" />
          </>
        );
      })}
    </section>
  );
}

export default MoviesCardList;

// компонент, который управляет отрисовкой карточек фильмов на страницу и их количеством
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList(props) {
  return (
    <>
      <section className="movies-list" aria-label="movies-cards">
        {props.movies.map((movie) => {
          return (
            <MoviesCard
              key={movie.id} // в зависимости от роута id или _id
              movie={movie}
              savedMovies={props.savedMovies}
              onMovieSave={props.onMovieSave}
              onMovieRemove={props.onMovieRemove}
            />
          );
        })}
      </section>
    </>
  );
}

export default MoviesCardList;

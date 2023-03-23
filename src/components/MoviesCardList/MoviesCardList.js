// компонент, который управляет отрисовкой карточек фильмов на страницу и их количеством
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import { useLocation } from 'react-router-dom';
import { api } from '../../utils/MainApi';

function MoviesCardList(props) {
  const location = useLocation();

  const handleMovieRemove = (movie) => {
    // если фильм с роута movies, то найти его в savedMovies
    // и отправить запрос на удаление с _id из сохраненной карточки
    const idToRemove = movie.movieId
      ? movie._id
      : props.savedMovies.find((item) => item.id === movie.movieId)._id;

    api
      .deleteMovie(idToRemove)
      .then(() => {
        if (location.pathname === '/movies') {
          props.onChangeSavedMovies(props.savedMovies.filter((item) => item.movieId !== movie.id));
        } else {
          props.onChangeSavedMovies(props.movies.filter((item) => item.movieId !== movie.movieId));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleMovieSave = (movie) => {
    api
      .saveMovie(movie)
      .then((newMovie) => {
        props.onChangeSavedMovies((savedMovies) => [...savedMovies, newMovie]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // если общая страница фильмов, то по кнопке или удалять, или сохранять фильм, и менять переменную состояния в app
  if (location.pathname === '/movies') {
    const savedMoviesIdList = props.savedMovies.map((element) => element.movieId);

    return (
      <>
        <section className="movies-list" aria-label="movies-cards">
          {props.movies.map((movie) => {
            // признак того, сохранен ли фильм
            const isMovieSaved = savedMoviesIdList.some((i) => i === movie.id);
            return (
              <MoviesCard
                key={movie.id}
                movie={movie}
                isMovieSaved={isMovieSaved}
                onMovieSave={handleMovieSave}
                onMovieRemove={handleMovieRemove}
              />
            );
          })}
        </section>
      </>
    );
  }
  // если страница сохраненных фильмов, то по кнопке фильм нужно удалить, переменную состояния в app изменить
  return (
    <>
      <section className="movies-list" aria-label="movies-cards">
        {props.movies.map((movie) => {
          return <MoviesCard key={movie._id} movie={movie} onMovieRemove={handleMovieRemove} />;
        })}
      </section>
    </>
  );
}

export default MoviesCardList;

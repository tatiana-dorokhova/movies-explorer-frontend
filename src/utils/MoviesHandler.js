import { SHORT_MOVIE_DURATION } from './constants';

// регистронезависимый поиск фильмов по заданному фильтру
export const findMoviesBySearchQuery = ({ movies, searchQuery, shortFilms }) => {
  // найдем все фильмы по searchQuery
  const allMovies = movies.filter(
    (film) =>
      film.nameEN.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1 ||
      film.nameRU.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1,
  );
  // отфильтруем их, если нужно, по shortFilms
  if (shortFilms) {
    return allMovies.filter((film) => film.duration <= SHORT_MOVIE_DURATION);
  }
  return allMovies;
};

export const formatDuration = (totalMinutes) => {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = Math.floor((totalMinutes * 60) % 3600) / 60;
  // добавить, если нужны секунды
  // const seconds = (totalMinutes - hours * 60 - minutes) * 60

  return [`${hours}ч`, `${minutes}м`].filter((item) => item[0] !== '0').join(' ');
};

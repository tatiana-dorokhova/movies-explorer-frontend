// регистронезависимый поиск фильмов по заданному фильтру
export const findMoviesBySearchQuery = ({ films, searchQuery }) => {
  return films.filter((film) => {
    return (
      film.nameEN.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1 ||
      film.nameRU.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1 ||
      film.director.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1
    );
  });
};

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

export const formatDuration = (totalMinutes) => {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = Math.floor((totalMinutes * 60) % 3600) / 60;
  // добавить, если нужны секунды
  // const seconds = (totalMinutes - hours * 60 - minutes) * 60

  return [`${hours}ч`, `${minutes}м`].filter((item) => item[0] !== '0').join(' ');
};

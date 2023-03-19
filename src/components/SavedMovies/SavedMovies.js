// компонент страницы с сохранёнными карточками фильмов
import './SavedMovies.css';

import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function SavedMovies(props) {
  const handleMovieRemove = () => {
    console.log('onMovieRemove worked');
  };

  return (
    <>
      <SearchForm />
      <MoviesCardList movies={props.movies} onMovieRemove={handleMovieRemove} />
    </>
  );
}

export default SavedMovies;

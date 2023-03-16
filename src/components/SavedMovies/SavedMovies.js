// компонент страницы с сохранёнными карточками фильмов
import './SavedMovies.css';

import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function SavedMovies(props) {
  // const isUserLoggedIn = props.isLoggedIn;

  return (
    <>
      <SearchForm />
      <MoviesCardList
        movies={props.movies}
        onMovieSave={props.onMovieSave}
        onMovieRemove={props.onMovieRemove}
      />
      {/* <Preloader /> */}
    </>
  );
}

export default SavedMovies;

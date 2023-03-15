// компонент со ссылками на другие проекты
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
// import Preloader from '../Preloader/Preloader';

function Movies(props) {
  return (
    <>
      <SearchForm
        isOn={props.isOn}
        onSwitcherToggle={props.onSwitcherToggle}
        onSubmit={props.onSearchSubmit}
      />
      <MoviesCardList
        movies={props.movies}
        onMovieSave={props.onMovieSave}
        onMovieRemove={props.onMovieRemove}
      />
      {/* <Preloader /> */}
    </>
  );
}

export default Movies;

// компонент со ссылками на другие проекты
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';

function Movies(props) {
  const isUserLoggedIn = props.isLoggedIn;

  return (
    <>
      <SearchForm isOn={props.isOn} onSwitcherToggle={props.onSwitcherToggle} />
      <MoviesCardList movies={props.movies} onMovieSave={props.onMovieSave} />
      {/* <Preloader /> */}
    </>
  );
}

export default Movies;

// компонент со ссылками на другие проекты
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';

function Movies(props) {
  const isUserLoggedIn = props.isLoggedIn;

  return <SearchForm isOn={props.isOn} handleToggle={props.handleToggle} />;
}

export default Movies;

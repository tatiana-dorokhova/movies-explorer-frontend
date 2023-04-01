import './MoviesSearchErrors.css';

const MoviesSearchErrors = (props) => {
  return (
    <div className="movies-not-found">
      <p className="movies-not-found__text">{props.errorText}</p>
    </div>
  );
};

export default MoviesSearchErrors;

// форма поиска, куда пользователь будет вводить запрос
import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import React, { useState } from 'react';

function SearchForm(props) {
  const [isSearchInputEmpty, setIsSearchInputEmpty] = useState(false);
  const [searchFieldValue, setSearchFieldValue] = useState(null);

  const [isShortFilmSelected, setIsShortFilmSelected] = useState(false);

  const handleShortFilmToggle = () => {
    setIsShortFilmSelected(!isShortFilmSelected);
  };

  const handleChange = (event) => {
    setSearchFieldValue(event.target.value);
  };

  const handleSubmit = (event) => {
    if (!searchFieldValue) {
      event.preventDefault();
      setIsSearchInputEmpty(true);
    } else {
      event.preventDefault();
      setIsSearchInputEmpty(false);
      props.onSubmit({ searchQuery: searchFieldValue, shortFilms: isShortFilmSelected });
      setSearchFieldValue(null);
    }
  };

  return (
    <div className="search-form">
      <div className="search-form__container">
        <div className="search-form__icon"></div>

        <form className="search-form__form" onSubmit={handleSubmit}>
          <label className="search-form__label" htmlFor="search-form-input">
            <input
              className="search-form__input"
              type="text"
              value={searchFieldValue ?? ''}
              onChange={handleChange}
              name="search-form-input"
              placeholder="Фильм"
            />
            <span
              className={
                isSearchInputEmpty
                  ? 'search-form__input-error search-form__input-error_visible'
                  : 'search-form__input-error'
              }
            >
              Нужно ввести ключевое слово
            </span>
          </label>

          <button className="search-form__button" type="submit"></button>
        </form>

        <div className="search-form__switcher">
          <FilterCheckbox isOn={isShortFilmSelected} onSwitcherToggle={handleShortFilmToggle} />
          <p className="search-form__caption">Короткометражки</p>
        </div>
      </div>
    </div>
  );
}

export default SearchForm;

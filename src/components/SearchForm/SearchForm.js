// форма поиска, куда пользователь будет вводить запрос
import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm(props) {
  return (
    <div className="search-form">
      <div className="search-form__container">
        <div className="search-form__content">
          <div className="search-form__icon"></div>
          <form className="search-form__form">
            <input
              className="search-form__input"
              type="text"
              name="search-form-input"
              placeholder="Фильм"
              required
            />
            <button className="search-form__button"></button>
          </form>
        </div>
        <div className="search-form__switcher">
          <FilterCheckbox
            isOn={props.isOn}
            onSwitcherToggle={props.onSwitcherToggle}
          />
          <p className="search-form__caption">Короткометражки</p>
        </div>
      </div>
    </div>
  );
}

export default SearchForm;

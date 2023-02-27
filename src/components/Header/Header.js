// компонент, который отрисовывает шапку сайта на страницу

import { Link, useLocation } from 'react-router-dom';
import './Header.css';

// в зависимости от того, залогинен пользователь или нет, показываем:

// не залогинен:
// показываем landing, логотип, кнопки Регистрация и Войти

// нажата кнопка Регистрация:
// лого, надпись Добро пожаловать!, форма регистрации

// нажата кнопка Войти:
// лого, надпись Рады видеть!, форма логина

// залогинен:
// лого, ссылки Фильмы и Сохраненные фильмы, кнопка Аккаунт

// изменение профиля:
// лого, ссылки Фильмы и Сохраненные фильмы, кнопка Аккаунт

function Header(props) {
  const location = useLocation();

  return (
    <header className="header section">
      <img className="header__logo" src={props.src} alt={props.alt} />
      <div className="header__buttons-block">
        {location.pathname === '/' && (
          <>
            <Link to="/sign-up" className="header__link">
              Регистрация
            </Link>
            <button
              type="button"
              className="header__button"
              onClick={props.onSignIn}
            >
              Войти
            </button>
          </>
        )}
      </div>

      {/* <div className="header__info-panel">
        {location.pathname === '/sign-up' && (
          <Link to="/sign-in" className="header__link">
            Войти
          </Link>
        )}
        {location.pathname === '/sign-in' && (
          <Link to="/sign-up" className="header__link">
            Регистрация
          </Link>
        )}
        {location.pathname === '/' && (
          <>
            <p className="header__text">{props.email}</p>
            <button type="button" className="header__link" onClick={props.onSignOut}>
              Выйти
            </button>
          </>
        )}
      </div> */}
    </header>
  );
}

export default Header;

// компонент, который отрисовывает шапку сайта на страницу

import { Link, NavLink, useLocation } from 'react-router-dom';
import './Header.css';

// в зависимости от того, залогинен пользователь или нет, показываем (на 1280px):

// не залогинен:
// показываем логотип, кнопки Регистрация и Войти

// нажата кнопка Регистрация / Войти:
// лого, надпись Добро пожаловать! или Рады видеть!, форма регистрации или логина

// залогинен (в том числе страница изменения профиля)
// лого, ссылки Фильмы и Сохраненные фильмы, кнопка Аккаунт

function Header(props) {
  const location = useLocation();
  const isUserLoggedIn = props.isLoggedIn;

  return (
    <header className="header">
      {location.pathname === '/' && (
        <>
          <div className="header__main-container">
            <img className="header__logo" src={props.src} alt={props.alt} />
            <div className="header__buttons-block">
              <Link to="/sign-up" className="header__link header_main-page">
                Регистрация
              </Link>
              <Link
                to="/sign-in"
                className="header__link header_main-page header_button header_signin"
              >
                Войти
              </Link>
            </div>
          </div>
        </>
      )}

      {location.pathname === '/sign-up' && (
        <>
          <div className="header__auth-container">
            <img className="header__logo" src={props.src} alt={props.alt} />
            <div className="header__message">Добро пожаловать!</div>
          </div>
        </>
      )}

      {location.pathname === '/sign-in' && (
        <>
          <div className="header__auth-container">
            <img className="header__logo" src={props.src} alt={props.alt} />
            <div className="header__message">Рады видеть!</div>
          </div>
        </>
      )}

      {(location.pathname === '/movies' ||
        location.pathname === '/saved-movies') &&
        isUserLoggedIn && (
          <>
            <div className="header__main-container">
              <img className="header__logo" src={props.src} alt={props.alt} />
              <div className="header__buttons-block">
                <NavLink
                  to="/movies"
                  className={({ isActive }) =>
                    isActive
                      ? 'header__link header_films header_selected'
                      : 'header__link header_films'
                  }
                >
                  Фильмы
                </NavLink>
                <NavLink
                  to="/saved-movies"
                  className={({ isActive }) =>
                    isActive
                      ? 'header__link header_films header_selected'
                      : 'header__link header_films'
                  }
                >
                  Сохранённые фильмы
                </NavLink>
              </div>
              <Link
                to="/profile"
                className="header__link header_button header_selected header_account"
              >
                Аккаунт
              </Link>
            </div>
          </>
        )}
    </header>
  );
}

export default Header;

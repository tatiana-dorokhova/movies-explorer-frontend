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
            <img
              className="header__logo"
              src={props.logoSrc}
              alt={props.logoAlt}
            />
            <div className="header__buttons-block">
              <Link
                to="/sign-up"
                className="header__link header__link_main-page"
              >
                Регистрация
              </Link>
              <Link
                to="/sign-in"
                className="header__link header__link_main-page header__link_button header__link_signin"
              >
                Войти
              </Link>
            </div>
          </div>
        </>
      )}

      {(location.pathname === '/sign-up' ||
        location.pathname === '/sign-in') && (
        <>
          <div className="header__auth-container">
            <img
              className="header__logo"
              src={props.logoSrc}
              alt={props.logoAlt}
            />
          </div>
        </>
      )}

      {(location.pathname === '/movies' ||
        location.pathname === '/saved-movies' ||
        location.pathname === '/profile') &&
        isUserLoggedIn && (
          <>
            <div className="header__main-container">
              <div>
                <img
                  className="header__logo"
                  src={props.logoSrc}
                  alt={props.logoAlt}
                />

                {/* поначалу скрытая кнопка бургер-меню */}
                <input
                  class="checkbox-mobile-menu"
                  type="checkbox"
                  id="checkbox-mobile-menu"
                />
                <label class="burger" for="checkbox-mobile-menu">
                  <span class="burger-line"></span>
                </label>

                {/* навигация по странице мобильного меню */}
                <nav class="mobile-menu">
                  <label class="burger-close" for="checkbox-mobile-menu">
                    <img
                      src={props.closeButtonSrc}
                      class="burger-line-close"
                      alt={props.closeButtonAlt}
                      title="Burger button"
                    />
                  </label>
                  <ul class="ul-mobile-menu">
                    <li>
                      <NavLink
                        to="/"
                        className={({ isActive }) =>
                          isActive
                            ? 'header__link header__link_films header__link_selected'
                            : 'header__link header__link_films'
                        }
                      >
                        Главная
                      </NavLink>
                    </li>

                    <li>
                      <NavLink
                        to="/movies"
                        className={({ isActive }) =>
                          isActive
                            ? 'header__link header__link_films header__link_selected'
                            : 'header__link header__link_films'
                        }
                      >
                        Фильмы
                      </NavLink>
                    </li>

                    <li>
                      <NavLink
                        to="/movies"
                        className={({ isActive }) =>
                          isActive
                            ? 'header__link header__link_films header__link_selected'
                            : 'header__link header__link_films'
                        }
                      >
                        Сохранённые фильмы
                      </NavLink>
                    </li>
                    <Link
                      to="/profile"
                      className="header__link header__link_button header__link_selected header__link_account"
                    >
                      Аккаунт
                    </Link>
                  </ul>
                </nav>
              </div>
              <div className="header__buttons-block">
                <NavLink
                  to="/movies"
                  className={({ isActive }) =>
                    isActive
                      ? 'header__link header__link_films header__link_selected'
                      : 'header__link header__link_films'
                  }
                >
                  Фильмы
                </NavLink>
                <NavLink
                  to="/saved-movies"
                  className={({ isActive }) =>
                    isActive
                      ? 'header__link header__link_films header__link_selected'
                      : 'header__link header__link_films'
                  }
                >
                  Сохранённые фильмы
                </NavLink>
              </div>
              <Link
                to="/profile"
                className="header__link header__link_button header__link_selected header__link_account"
              >
                Аккаунт
              </Link>
            </div>
            {/* <div className="header__main-container">
              <img className="header__logo" src={props.src} alt={props.alt} />
              <div className="header__buttons-block">
                <NavLink
                  to="/movies"
                  className={({ isActive }) =>
                    isActive
                      ? 'header__link header__link_films header__link_selected'
                      : 'header__link header__link_films'
                  }
                >
                  Фильмы
                </NavLink>
                <NavLink
                  to="/saved-movies"
                  className={({ isActive }) =>
                    isActive
                      ? 'header__link header__link_films header__link_selected'
                      : 'header__link header__link_films'
                  }
                >
                  Сохранённые фильмы
                </NavLink>
              </div>
              <Link
                to="/profile"
                className="header__link header__link_button header__link_selected header__link_account"
              >
                Аккаунт
              </Link>
            </div> */}
          </>
        )}
    </header>
  );
}

export default Header;

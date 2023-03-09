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
              <img
                className="header__logo"
                src={props.logoSrc}
                alt={props.logoAlt}
              />
              <div className="header__mobile-navigation">
                {/* поначалу скрытая кнопка бургер-меню */}
                <input
                  className="header__burger-checkbox"
                  type="checkbox"
                  id="checkbox-mobile-menu"
                />
                <label
                  className="header__burger-button"
                  htmlFor="checkbox-mobile-menu"
                >
                  <span className="header__burger-line"></span>
                </label>

                {/* навигация по странице мобильного меню */}
                <nav className="header__mobile-menu">
                  <ul className="header__mobile-menu-list">
                    <li className="header__mobile-menu-item">
                      <NavLink
                        to="/"
                        className={({ isActive }) =>
                          isActive
                            ? 'header__link header__link_mobile header__link_mobile-selected'
                            : 'header__link header__link_mobile'
                        }
                      >
                        Главная
                      </NavLink>
                    </li>
                    <li className="header__mobile-menu-item">
                      <NavLink
                        to="/movies"
                        className={({ isActive }) =>
                          isActive
                            ? 'header__link header__link_mobile header__link_mobile-selected'
                            : 'header__link header__link_mobile'
                        }
                      >
                        Фильмы
                      </NavLink>
                    </li>

                    <li className="header__mobile-menu-item">
                      <NavLink
                        to="/saved-movies"
                        className={({ isActive }) =>
                          isActive
                            ? 'header__link header__link_mobile header__link_mobile-selected'
                            : 'header__link header__link_mobile'
                        }
                      >
                        Сохранённые&nbsp;фильмы
                      </NavLink>
                    </li>
                    <li className="header__mobile-menu-item header__mobile-menu-item_account">
                      <Link
                        to="/profile"
                        className="header__link header__link_button header__link_selected header__link_account"
                      >
                        Аккаунт
                      </Link>
                    </li>
                  </ul>
                </nav>
              </div>

              {/* изначально видимый блок навигации в шапке на больших разрешениях экрана */}
              <div className="header__links-block">
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
                  Сохранённые&nbsp;фильмы
                </NavLink>
              </div>
              <div className="header__account-block">
                <Link
                  to="/profile"
                  className="header__link header__link_button header__link_selected header__link_account"
                >
                  Аккаунт
                </Link>
              </div>
            </div>
          </>
        )}
    </header>
  );
}

export default Header;

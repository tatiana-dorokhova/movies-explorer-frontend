// компонент, который отрисовывает шапку сайта на страницу

import { Link, NavLink, useLocation } from 'react-router-dom';
import './Header.css';
import HeaderLogo from '../HeaderLogo/HeaderLogo';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useContext } from 'react';

function Header(props) {
  const currentUser = useContext(CurrentUserContext);

  const location = useLocation();

  const activeNavLink = ({ isActive }) =>
    isActive
      ? 'header__link header__link_films header__link_active'
      : 'header__link header__link_films';

  const activeMobileNavLink = ({ isActive }) =>
    isActive
      ? 'header__link header__link_mobile header__link_mobile-active'
      : 'header__link header__link_mobile';

  return (
    <header className="header">
      {location.pathname === '/' && !currentUser._id && (
        <>
          <div className="header__main-container">
            <HeaderLogo logoSrc={props.logoSrc} logoAlt={props.logoAlt} />
            <div className="header__buttons-block">
              <Link to="/sign-up" className="header__link header__link_main-page">
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

      {(location.pathname === '/sign-up' || location.pathname === '/sign-in') && (
        <>
          <div className="header__auth-container">
            <HeaderLogo logoSrc={props.logoSrc} logoAlt={props.logoAlt} />
          </div>
        </>
      )}

      {(location.pathname === '/' ||
        location.pathname === '/movies' ||
        location.pathname === '/saved-movies' ||
        location.pathname === '/profile') &&
        currentUser._id && (
          <>
            <div className="header__main-container">
              <HeaderLogo logoSrc={props.logoSrc} logoAlt={props.logoAlt} />

              {/* поначалу скрытая кнопка бургер-меню */}
              <input
                className="header__burger-checkbox"
                type="checkbox"
                id="checkbox-mobile-menu"
              />
              <label className="header__burger-button" htmlFor="checkbox-mobile-menu">
                <span className="header__burger-line"></span>
              </label>

              <label className="header__mobile-menu-overlay" htmlFor="checkbox-mobile-menu"></label>

              {/* навигация по странице мобильного меню */}
              <nav className="header__mobile-menu">
                <ul className="header__mobile-menu-list">
                  <li className="header__mobile-menu-item">
                    <NavLink to="/" className={activeMobileNavLink}>
                      Главная
                    </NavLink>
                  </li>

                  <li className="header__mobile-menu-item">
                    <NavLink to="/movies" className={activeMobileNavLink}>
                      Фильмы
                    </NavLink>
                  </li>

                  <li className="header__mobile-menu-item">
                    <NavLink to="/saved-movies" className={activeMobileNavLink}>
                      Сохранённые&nbsp;фильмы
                    </NavLink>
                  </li>

                  <li className="header__mobile-menu-item header__mobile-menu-item_account">
                    <Link
                      to="/profile"
                      className="header__link header__link_button header__link_active header__link_account"
                    >
                      Аккаунт
                    </Link>
                  </li>
                </ul>
              </nav>

              {/* изначально видимый блок навигации в шапке на больших разрешениях экрана */}
              <div className="header__links-block">
                <NavLink to="/movies" className={activeNavLink}>
                  Фильмы
                </NavLink>
                <NavLink to="/saved-movies" className={activeNavLink}>
                  Сохранённые&nbsp;фильмы
                </NavLink>
              </div>
              <div className="header__account-block">
                <Link
                  to="/profile"
                  className="header__link header__link_button header__link_active header__link_account"
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

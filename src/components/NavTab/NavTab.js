// компонент с навигацией по странице «О проекте»
import './NavTab.css';

function NavTab(props) {
  return (
    <div className="navtab">
      <a className="navtab__button" href="#aboutProjectSection">
        О проекте
      </a>
      <a className="navtab__button" href="#techsSection">
        Технологии
      </a>
      <a className="navtab__button" href="#aboutMeSection">
        Студент
      </a>
    </div>
  );
}

export default NavTab;

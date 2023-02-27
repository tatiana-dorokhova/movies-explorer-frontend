// компонент с навигацией по странице «О проекте»
import './NavTab.css';

function NavTab(props) {
  return (
    <div className="navtab">
      <button className="navtab__button">О проекте</button>
      <button className="navtab__button">Технологии</button>
      <button className="navtab__button">Студент</button>
    </div>
  );
}

export default NavTab;

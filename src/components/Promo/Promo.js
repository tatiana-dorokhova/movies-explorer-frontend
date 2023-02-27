// компонент с вёрсткой баннера страницы «О проекте»
import './Promo.css';
import NavTab from '../NavTab/NavTab';

function Promo(props) {
  return (
    <section className="promo">
      <h1 className="promo__text">
        Учебный проект студента факультета Веб-разработки.
      </h1>
      <NavTab />
    </section>
  );
}

export default Promo;

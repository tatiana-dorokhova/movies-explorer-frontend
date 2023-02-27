// компонент со ссылками на другие проекты
import './Portfolio.css';

function Portfolio(props) {
  return (
    <section className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <ul className="portfolio__list">
        <li className="portfolio__item">Статичный сайт</li>
        <li className="portfolio__item">Адаптивный сайт</li>
        <li className="portfolio__item">Одностраничное приложение</li>
      </ul>
    </section>
  );
}

export default Portfolio;

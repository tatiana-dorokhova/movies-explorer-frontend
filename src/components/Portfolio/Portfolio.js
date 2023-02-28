// компонент со ссылками на другие проекты
import './Portfolio.css';

function Portfolio(props) {
  return (
    <section className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <ul className="portfolio__list">
        <li className="portfolio__item">
          <div>Статичный сайт</div>
          <a className="portfolio__link" href="#">
            ↗
          </a>
        </li>
        <li className="portfolio__item">
          <div>Адаптивный сайт</div>
          <a className="portfolio__link" href="#">
            ↗
          </a>
        </li>
        <li className="portfolio__item">
          <div>Одностраничное приложение</div>
          <a className="portfolio__link" href="#">
            ↗
          </a>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;

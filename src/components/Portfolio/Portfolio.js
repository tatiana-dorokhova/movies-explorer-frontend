// компонент со ссылками на другие проекты
import './Portfolio.css';

function Portfolio(props) {
  return (
    <section className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <ul className="portfolio__list">
        <li className="portfolio__item">
          <div>Статичный сайт</div>
          <a
            className="portfolio__link"
            href="https://tatiana-dorokhova.github.io/how-to-learn/"
          >
            ↗
          </a>
        </li>
        <li className="portfolio__item">
          <div>Адаптивный сайт</div>
          <a
            className="portfolio__link"
            href="https://tatiana-dorokhova.github.io/russian-travel/"
          >
            ↗
          </a>
        </li>
        <li className="portfolio__item">
          <div>Одностраничное приложение</div>
          <a
            className="portfolio__link"
            href="https://mesto.dorokhova.nomoredomains.work"
          >
            ↗
          </a>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;

// компонент со ссылками на другие проекты
import './Portfolio.css';

function Portfolio(props) {
  return (
    <section className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <ul className="portfolio__list">
        <li className="portfolio__item">
          <a
            className="portfolio__link"
            href="https://tatiana-dorokhova.github.io/how-to-learn/"
          >
            <p className="portfolio__link-text">Статичный&nbsp;сайт</p>
            <span>↗</span>
          </a>
        </li>

        <li className="portfolio__item">
          <a
            className="portfolio__link"
            href="https://tatiana-dorokhova.github.io/russian-travel/"
          >
            <p className="portfolio__link-text">Адаптивный&nbsp;сайт</p>
            <span>↗</span>
          </a>
        </li>

        <li className="portfolio__item">
          <a
            className="portfolio__link"
            href="https://mesto.dorokhova.nomoredomains.work"
          >
            <p className="portfolio__link-text">Одностраничное приложение</p>
            <span>↗</span>
          </a>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;

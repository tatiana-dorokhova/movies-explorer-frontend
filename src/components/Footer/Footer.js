// презентационный компонент, который отрисовывает подвал
import './Footer.css';

function Footer(props) {
  return (
    <div className="footer">
      <p className="footer__description">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </p>
      <div className="footer__columns">
        <div className="footer__copyright">© 2023</div>
        <nav className="footer__links">
          <a
            className="footer__link"
            href="https://practicum.yandex.ru"
            target="_blank"
            rel="noreferrer"
          >
            Яндекс.Практикум
          </a>
          <a
            className="footer__link"
            href="https://github.com/tatiana-dorokhova"
            target="_blank"
            rel="noreferrer"
          >
            Github
          </a>
        </nav>
      </div>
    </div>
  );
}

export default Footer;

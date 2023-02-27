// компонент с информацией о студенте

import './AboutMe.css';

function AboutMe(props) {
  return (
    <section className="about-me">
      <h2 className="about-me__title">Студент</h2>
      <div className="about-me__columns">
        <div className="about-me__info">
          <div className="about-me__name">Татьяна</div>
          <p className="about-me__job">Начинающий фронтенд-разработчик</p>
          <p className="about-me__description">
            Здесь последует длинное жизнеописание для проверки того, как
            переносятся слова и добавляются новые строки по мере роста опыта.
            Три-четыре строки в двести символов длиной вполне достаточно, чтобы
            оценить масштаб и проверить позиционирование блока на общем фоне.
          </p>
          <a
            className="about-me__github-link"
            href="https://github.com/tatiana-dorokhova"
          >
            Github
          </a>
        </div>
        <div className="about-me__photo"></div>
      </div>
    </section>
  );
}

export default AboutMe;

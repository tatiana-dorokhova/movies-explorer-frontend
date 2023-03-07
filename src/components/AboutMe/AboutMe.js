// компонент с информацией о студенте

import './AboutMe.css';

function AboutMe(props) {
  return (
    <section className="about-me" id="aboutMeSection">
      <h2 className="about-me__title">Студент</h2>
      <div className="about-me__columns">
        <div className="about-me__info">
          <div className="about-me__info-block">
            <div className="about-me__name">Татьяна</div>
            <p className="about-me__job">Начинающий фронтенд-разработчик</p>
            <p className="about-me__description">
              Я долгое время жила и работала в Новосибирске и Москве, закончила
              мехмат НГУ. Люблю посещать театры и концерты, увлекаюсь дайвингом,
              походами, парапланами, мотоциклами. Больше десяти лет работала в
              Яндексе, но кодить начала совсем недавно. После курса по
              веб-разработке продолжу работать в IT, хочу начать с автотестов и
              плавно перебраться в продакшн-разработку.
            </p>
          </div>
          <a
            className="about-me__github-link"
            href="https://github.com/tatiana-dorokhova"
            target="_blank"
            rel="noreferrer"
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

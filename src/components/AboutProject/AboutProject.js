// компонент с описанием дипломного проекта
import './AboutProject.css';

function AboutProject(props) {
  return (
    <section className="about-project">
      <h2 className="about-project__title">О проекте</h2>
      <div className="about-project__columns">
        <div className="about-project__column">
          <p className="about-project__column-title">
            Дипломный проект включал 5 этапов
          </p>
          <p className="about-project__column-content">
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </div>
        <div className="about-project__column">
          <p className="about-project__column-title">
            На выполнение диплома ушло 5 недель
          </p>
          <p className="about-project__column-content">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </div>
      </div>
      <div className="about-project__stages">
        <div className="about-project__stage about-project_dark">1 неделя</div>
        <div className="about-project__stage about-project_light">4 недели</div>
        <div className="about-project__caption">Back-end</div>
        <div className="about-project__caption">Front-end</div>
      </div>
    </section>
  );
}

export default AboutProject;

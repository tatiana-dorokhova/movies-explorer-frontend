// компонент с использованными технологиями
import './Techs.css';

function Techs(props) {
  return (
    <section className="techs" id="techsSection">
      <h2 className="techs__title">Технологии</h2>
      <div className="techs__content">
        <div className="techs__head">7 технологий</div>
        <div className="techs__text">
          На курсе веб-разработки мы освоили технологии, которые применили в
          дипломном проекте.
        </div>
        <ul className="techs__list">
          <li className="techs__item">HTML</li>
          <li className="techs__item">CSS</li>
          <li className="techs__item">JS</li>
          <li className="techs__item">React</li>
          <li className="techs__item">Git</li>
          <li className="techs__item">Express.js</li>
          <li className="techs__item">mongoDB</li>
        </ul>
      </div>
    </section>
  );
}

export default Techs;

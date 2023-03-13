// компонент страницы изменения профиля
import React from 'react';
import { Link } from 'react-router-dom';

import './Profile.css';

function Profile(props) {
  const [values, setValues] = React.useState({});

  function handleChange(event) {
    const { name, value } = event.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onAuth({
      name: values[props.inputName],
      email: values[props.inputEmail],
    });
  }

  return (
    <>
      <div className="profile">
        <h2 className="profile__title">{props.title}</h2>

        <form
          className="profile__form"
          name={`form_${props.formName}`}
          onSubmit={handleSubmit}
          action="#"
        >
          <label className="profile__label">
            Имя
            <input
              className="profile__input"
              type="text"
              name={props.inputName}
              value={values[props.inputName] ?? ''}
              onChange={handleChange}
              required
            />
          </label>

          <label className="profile__label">
            E-mail
            <input
              className="profile__input"
              type="email"
              name={props.inputEmail}
              value={values[props.inputEmail] ?? ''}
              onChange={handleChange}
              required
            />
          </label>

          <button className="profile__submit-button" type="submit">
            {props.submitButtonName}
          </button>
        </form>

        <Link to={props.route} className="profile__link">
          {props.profileSignoutButtonText}
        </Link>
      </div>
    </>
  );
}

export default Profile;

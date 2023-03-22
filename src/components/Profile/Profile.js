// компонент страницы изменения профиля
import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';

import './Profile.css';

import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function Profile(props) {
  const currentUser = useContext(CurrentUserContext);
  // const [values, setValues] = useState({ name: 'currentUser', email: 'props.email' });
  const [values, setValues] = useState({ name: currentUser.name, email: props.email });

  function handleChange(event) {
    const { name, value } = event.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onEditProfile({
      name: values['name'],
      email: values['email'],
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
              name="name"
              value={values['name'] ?? ''}
              onChange={handleChange}
              required
            />
          </label>

          <label className="profile__label">
            E-mail
            <input
              className="profile__input"
              type="email"
              name="email"
              value={values['email'] ?? ''}
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

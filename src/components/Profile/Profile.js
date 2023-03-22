// компонент страницы изменения профиля
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import './Profile.css';

import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useFormWithValidation } from '../../utils/UseFormHook';

function Profile(props) {
  const currentUser = useContext(CurrentUserContext);
  const { values, handleChange, errors, isValid } = useFormWithValidation({
    name: currentUser.name,
    email: currentUser.email,
  });

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
            <span
              className={
                errors['name']
                  ? 'profile__input-error profile__input-error_visible profile__input-error_above'
                  : 'profile__input-error'
              }
            >
              {errors['name'] && 'Неверный формат имени'}
            </span>
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
            <span
              className={
                errors['email']
                  ? 'profile__input-error profile__input-error_visible profile__input-error_under'
                  : 'profile__input-error'
              }
            >
              {errors['email'] && 'Неверный формат email, проверьте, что поле содержит символ @'}
            </span>
          </label>

          <button
            className="profile__submit-button"
            disabled={isValid ? false : true}
            type="submit"
          >
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

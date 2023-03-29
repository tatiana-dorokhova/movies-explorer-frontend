import React from 'react';
import { Link } from 'react-router-dom';

import './AuthForm.css';
import { useFormWithValidation } from '../../utils/UseFormHook';

function AuthForm(props) {
  const { values, handleChange, errors, isValid } = useFormWithValidation({});

  function handleSubmit(e) {
    e.preventDefault();
    props.onAuth({
      name: values.name,
      email: values.email,
      password: values.password,
    });
  }

  function spanClassName(checkingCondition) {
    return checkingCondition
      ? 'auth__input-error auth__input-error_visible auth__input-error_red-color'
      : 'auth__input-error';
  }

  return (
    <div className="auth">
      <h2 className="auth__title">{props.title}</h2>

      <form
        className="auth__form"
        name={`form_${props.formName}`}
        onSubmit={handleSubmit}
        action="#"
        noValidate
      >
        {props.inputName && (
          <label className="auth__label" htmlFor={props.inputName}>
            Имя
            <input
              className={errors.name ? 'auth__input auth__input-error_red-color' : 'auth__input'}
              type="text"
              name="name"
              value={values.name ?? ''}
              onChange={handleChange}
              pattern='[А-Яа-яЁёa-zA-Z\s-]{2,30}'
              required
            />
            <span className={spanClassName(errors.name)}>{errors.name}</span>
          </label>
        )}

        <label className="auth__label" htmlFor={props.inputEmail}>
          E-mail
          <input
            className={errors.email ? 'auth__input auth__input-error_red-color' : 'auth__input'}
            type="email"
            name="email"
            value={values.email ?? ''}
            onChange={handleChange}
            required
          />
          <span className={spanClassName(errors.email)}>{errors.email}</span>
        </label>

        <label className="auth__label" htmlFor={props.inputPassword}>
          Пароль
          <input
            className={errors.password ? 'auth__input auth__input-error_red-color' : 'auth__input'}
            type="password"
            name="password"
            value={values.password ?? ''}
            onChange={handleChange}
            required
          />
          <span className={spanClassName(errors.password)}>{errors.password}</span>
        </label>

        {/* блок сообщения об ошибке */}
        {/* <span
          className={
            props.err ? 'auth__submit-error auth__submit-error_visible' : 'auth__submit-error'
          }
        >
          {props.err ? `${props.err.name}: ${props.err.message}` : ''}
        </span> */}

        <button
          className={
            isValid ? 'auth__submit-button' : 'auth__submit-button auth__submit-button_inactive'
          }
          disabled={isValid ? false : true}
          type="submit"
        >
          {props.submitButtonName}
        </button>
      </form>
      <div className="auth__links">
        {props.authText}
        <Link to={props.route} className="auth__link">
          {props.authButtonText}
        </Link>
      </div>
    </div>
  );
}

export default AuthForm;

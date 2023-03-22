import React from 'react';
import { Link } from 'react-router-dom';

import './AuthForm.css';

function AuthForm(props) {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const [isNameValid, setIsNameValid] = React.useState(true);
  const [isEmailValid, setIsEmailValid] = React.useState(false);
  const [isPasswordValid, setIsPasswordValid] = React.useState(false);

  function handleChange(event) {
    const { name, value, validity } = event.target;
    if (name === 'name') {
      setName(value);
      validity.valid ? setIsNameValid(true) : setIsNameValid(false);
    }
    if (name === 'email') {
      setEmail(value);
      validity.valid ? setIsEmailValid(true) : setIsEmailValid(false);
    }
    if (name === 'password') {
      setPassword(value);
      validity.valid ? setIsPasswordValid(true) : setIsPasswordValid(false);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onAuth({
      name,
      email,
      password,
    });
  }

  function spanClassName(checkingCondition) {
    return checkingCondition
      ? 'auth__input-error'
      : 'auth__input-error auth__input-error_visible auth__input-error_red-color';
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
              className={isNameValid ? 'auth__input' : 'auth__input auth__input-error_red-color'}
              type="text"
              name="name"
              value={name ?? ''}
              onChange={handleChange}
              pattern="^[А-Яа-яЁёa-zA-Z\s\-]+$"
              required
            />
            <span className={spanClassName(isNameValid)}>Что-то пошло не так...</span>
          </label>
        )}

        <label className="auth__label" htmlFor={props.inputEmail}>
          E-mail
          <input
            className={isEmailValid ? 'auth__input' : 'auth__input auth__input-error_red-color'}
            type="email"
            name="email"
            value={email ?? ''}
            onChange={handleChange}
            required
          />
          <span className={spanClassName(isEmailValid)}>Что-то пошло не так...</span>
        </label>

        <label className="auth__label" htmlFor={props.inputPassword}>
          Пароль
          <input
            className={isPasswordValid ? 'auth__input' : 'auth__input auth__input-error_red-color'}
            type="password"
            name="password"
            value={password ?? ''}
            onChange={handleChange}
            required
          />
          <span className={spanClassName(isPasswordValid)}>Что-то пошло не так...</span>
        </label>

        <button
          className={'auth__submit-button'}
          disabled={isNameValid && isEmailValid && isPasswordValid ? false : true}
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

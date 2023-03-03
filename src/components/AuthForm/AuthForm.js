import React from 'react';
import { Link } from 'react-router-dom';

import './AuthForm.css';

function AuthForm(props) {
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
      password: values[props.inputPassword],
    });
  }

  return (
    <div className="auth">
      <h2 className="auth__title">{props.title}</h2>

      <form
        className="auth__form"
        name={`form_${props.formName}`}
        onSubmit={handleSubmit}
        action="#"
      >
        {props.inputName && (
          <label className="auth__label">
            Имя
            <input
              className="auth__input"
              type="text"
              name={props.inputName}
              value={values[props.inputName] ?? ''}
              onChange={handleChange}
              required
            />
          </label>
        )}

        <label className="auth__label">
          E-mail
          <input
            className="auth__input"
            type="email"
            name={props.inputEmail}
            value={values[props.inputEmail] ?? ''}
            onChange={handleChange}
            required
          />
        </label>

        <label className="auth__label">
          Пароль
          <input
            className="auth__input"
            type="password"
            name={props.inputPassword}
            value={values[props.inputPassword] ?? ''}
            onChange={handleChange}
            required
          />
        </label>

        <button className="auth__submit-button" type="submit">
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

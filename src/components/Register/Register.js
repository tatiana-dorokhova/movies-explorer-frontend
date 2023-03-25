// компонент страницы регистрации
import React from 'react';
import AuthForm from '../AuthForm/AuthForm';

function Register(props) {
  return (
    <>
      <AuthForm
        err={props.err}
        inputName="register-name"
        inputEmail="register-email"
        inputPassword="register-password"
        title="Добро пожаловать!"
        submitButtonName="Зарегистрироваться"
        formName="register"
        onAuth={props.onAuth}
        authText="Уже зарегистрированы?"
        route="/sign-in"
        authButtonText="Войти"
      />
    </>
  );
}

export default Register;

// компонент страницы авторизации
import React from 'react';
import AuthForm from '../AuthForm/AuthForm';

function Login(props) {
  return (
    <>
      <AuthForm
        err={props.err}
        inputEmail="login-email"
        inputPassword="login-password"
        title="Рады видеть!"
        submitButtonName="Войти"
        formName="login"
        onAuth={props.onAuth}
        authText="Ещё не зарегистрированы?"
        route="/sign-up"
        authButtonText="Регистрация"
      />
    </>
  );
}

export default Login;

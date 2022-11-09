// IMPORTS:
import React from 'react';
import { Link } from "react-router-dom";

// AUTH-PAGE COMPONENT:
function AuthPage({ formName, onSubmit, title, children, btnText, isValid }) {
  return (
    <section className="auth-page">
      <form
        className="auth-page__form"
        name={formName}
        onSubmit={onSubmit}
        noValidate
      >
        <h2 className="auth-page__title">{title}</h2>
        {children}
        <button type="submit" className="auth-page__btn" disabled={!isValid}>
          {btnText}
        </button>
        {formName === "register" && (
          <Link className="auth-page__link" to="/sign-in">
            Уже зарегистрированы? Войти
          </Link>
        )}
      </form>
    </section>
  );
}

export default AuthPage;

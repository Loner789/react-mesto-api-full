// IMPORTS:
import React from "react";
import logo from "../images/icon_logo.svg";
import UserInfo from "./UserInfo";
import { Link, Route } from "react-router-dom";

// HEADER COMPONENT:
function Header({ loggedIn, email, onSignOut, onClick, isClicked }) {
  return (
    <header
      className={`header ${
        loggedIn && "header_type_logged-in"
      } header_place_mesto`}
    >
      <div className="header__logo-wrapper">
        <Link to="/" target="blank">
          <img src={logo} alt="Логотип Россия." className="logo" />
        </Link>
        {loggedIn && (
          <button
            type="button"
            className={`header__burger-btn ${
              isClicked && "header__burger-btn_active"
            }`}
            onClick={onClick}
          />
        )}
      </div>
      <Route exact path="/">
        <UserInfo
          email={email}
          loggedIn={loggedIn}
          onSignOut={onSignOut}
          isClicked={isClicked}
        />
      </Route>
      <Route path="/sign-in">
        <Link className="header__link" to="/sign-up">
          Регистрация
        </Link>
      </Route>
      <Route path="/sign-up">
        <Link className="header__link" to="/sign-in">
          Войти
        </Link>
      </Route>
    </header>
  );
}

export default Header;

import React from "react";
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Menu({
  handleClickMenu,
  isActiveMenuMobile = false,
  elementClass = "",
  userData,
  loggedIn,
  handleLogOut,
}) {
  const location = useLocation();
  const email = userData.email;

  function signOut() {
    handleLogOut();
  }

  function clickMenu() {
    if (isActiveMenuMobile) {
      handleClickMenu();
    }
  }

  return (
    <nav className="header__menu main-menu">
      <ul
        className={`main-menu__items ${elementClass ? elementClass : ""} ${
          isActiveMenuMobile ? elementClass + "_active" : ""
        }`}
      >
        {loggedIn === false && (
          <>
            {location.pathname !== "/sign-in" && (
              <li className="main-menu__item" onClick={clickMenu}>
                <Link to="/sign-in" className="main-menu__item-link">
                  Войти
                </Link>
              </li>
            )}
            {location.pathname !== "/sign-up" && (
              <li className="main-menu__item" onClick={clickMenu}>
                <Link to="/sign-up" className="main-menu__item-link">
                  Регистрация
                </Link>
              </li>
            )}
          </>
        )}
        {email.length > 2 && (
          <li className="main-menu__item">
            <a href={`mailto:${email}`} className="main-menu__item-link">
              {email}
            </a>
          </li>
        )}
        {loggedIn === true && (
          <li className="main-menu__item" onClick={signOut}>
            <button
              className="main-menu__button"
              type="button"
              onClick={clickMenu}
            >
              Выйти
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}

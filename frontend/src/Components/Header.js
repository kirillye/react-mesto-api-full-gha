import { useState } from "react";
import Menu from "./Menu";

function Header({ logo, loggedIn, handleLogOut, email }) {
  const [isActiveMenuMobile, setIsActiveMenuMobile] = useState(false);
  function handleClickBurger() {
    setIsActiveMenuMobile((current) => !current);
  }

  return (
    <>
      <Menu
        handleClickMenu={handleClickBurger}
        elementClass={"mobile-menu"}
        isActiveMenuMobile={isActiveMenuMobile}
        loggedIn={loggedIn}
        handleLogOut={handleLogOut}
        email={email}
      />
      <header className="header">
        <div className="header__up">
          <a href="#root" onClick={(e) => e.preventDefault()}>
            <img src={logo} alt="Логотип" className="logo" />
          </a>
          <Menu loggedIn={loggedIn} handleLogOut={handleLogOut} />
          <label
            className={`main-menu__burger ${
              isActiveMenuMobile ? "main-menu__burger_active" : ""
            }`}
            onClick={handleClickBurger}
          >
            <span
              className={`main-menu__lines ${
                isActiveMenuMobile ? "main-menu__lines_active" : ""
              }`}
            ></span>
          </label>
        </div>
      </header>
    </>
  );
}

export default Header;

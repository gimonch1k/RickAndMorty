import { NavLink, Link, useLocation } from "react-router-dom";

import "./header.scss";

function Header() {
  const location = useLocation();

  const isCharactersActive =
    location.pathname === "/" || location.pathname.startsWith("/character/");

  return (
    <header className="header">
      <Link to="/" className="header__portal">
        <span>Rick</span>&Morty portal
      </Link>

      <div className="header__links">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive || isCharactersActive
              ? "header__link active"
              : "header__link"
          }
        >
          Characters
        </NavLink>
        <span className="header__divider">/</span>
        <NavLink to="/episodes" className="header__link">
          Episodes
        </NavLink>
      </div>
    </header>
  );
}

export default Header;

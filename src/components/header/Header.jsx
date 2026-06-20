import { NavLink, Link } from "react-router-dom";

import "./header.scss";

function Header() {
  return (
    <header className="header">
      <Link to="/" className="header__portal">
        <span>Rick</span>&Morty portal
      </Link>

      <div className="header__links">
        <NavLink to="/" className="header__link">
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

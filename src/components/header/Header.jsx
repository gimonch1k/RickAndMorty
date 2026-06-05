import "./header.scss";

function Header() {
  return (
    <header className="header">
      <a href="#" className="header__portal">
        <span>Rick</span>&Morty portal
      </a>

      <div className="header__links">
        <a href="#" className="header__link">
          Characters
        </a>
        <span className="header__divider">/</span>
        <a href="#" className="header__link">
          Comics
        </a>
      </div>
    </header>
  );
}

export default Header;

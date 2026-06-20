import "./bunner.scss";

import together from "../../assets/img/Episodes_bunner.png";
import logo from "../../assets/svg/Rick_and_Morty_logo.svg";

function Bunner() {
  return (
    <div className="bunner">
      <img src={together} alt="rick&morty" className="bunner__img" />
      <div className="bunner__text">
        New episodes is coming! <br /> Stay turned!
      </div>
      <img src={logo} alt="logo" className="bunner__logo" />
    </div>
  );
}

export default Bunner;

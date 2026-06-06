import "./errorMessage.scss";
import errorMessage from "../../assets/gif/ErrorMessage.gif";

function ErrorMessage() {
  return (
    <div className="errormessage">
      <img src={errorMessage} alt="error-message" />
    </div>
  );
}

export default ErrorMessage;

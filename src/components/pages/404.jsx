import { Link } from "react-router-dom";

import ErrorMessage from "../errorMessage/ErrorMessage";

function Page404() {
  return (
    <div style={{ marginTop: "100px" }}>
      <ErrorMessage />

      <div
        style={{
          textAlign: "center",
          fontSize: "30px",
          fontWeight: "700",
          marginTop: "20px",
        }}
      >
        Something went wrong...
      </div>

      <Link
        to="/"
        style={{
          display: "block",
          marginTop: "40px",
          textAlign: "center",
          fontSize: "20px",
        }}
      >
        Return to main page
      </Link>
    </div>
  );
}

export default Page404;

import React from "react";
import errorImage from "./error-image.png";
import "./Error.css"

const ErrorPage = () => {
  return (
    <div className="error-page">
      <img style={{width:"30%",height:"500px"}} src={errorImage} alt="Error" className="error-image" />
      <h1 className="error-heading">404 - Page Not Found</h1>
      <p className="error-message">The requested page does not exist.</p>
    </div>
  );
};

export default ErrorPage;

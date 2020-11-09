import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

function SignInScreen(props) {

  const submitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <section className="page-not-found">
      <Helmet>
        <title>Page not found</title>
      </Helmet>
      <div className="wrapper">
        <div className="page-not-found__container">
          <h2 className="page-not-found__title">Page not found</h2>
          <h3 className="page-not-found__error">404</h3>
          <Link to='/'>
            <button className="button cart-list-empty__button">Go to Main page</button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default SignInScreen;

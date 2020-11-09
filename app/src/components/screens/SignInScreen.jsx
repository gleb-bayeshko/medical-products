import React from "react";
import { Helmet } from "react-helmet";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { signIn } from "../../actions/userActions";
import Preloader from "../preloaders/Preloader";

function SignInScreen(props) {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const userSignIn = useSelector((state) => state.userSignIn);
  const { loading, userInfo, error } = userSignIn;

  const dispatch = useDispatch();

  useEffect(() => {
    if (userInfo) {
      const historyState = history.location.state;
      console.log(history.location.state);
      if (historyState && historyState.isAvailableToGoBack) {
        historyState.isAvailableToGoBack = false;
        console.log(history.location.state.isAvailableToGoBack);
        history.goBack();
      } else {
        history.push("/");
      }
    }
  }, [userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signIn(email, password));
  };

  return (
    <>
      <Helmet>
        <title>Sign In</title>
      </Helmet>
      {loading ? (
        <section className="content">
          <div className="wrapper">
            <Preloader />
          </div>
        </section>
      ) : (
        <section className="sign-in">
          <div className="wrapper">
            <div className="sign-in__container">
              <h2 className="sign-in__title">Sign In</h2>
              <form className="sign-in__form" onSubmit={submitHandler}>
                {error && <div className="auth-warning-message">{error}</div>}
                <label htmlFor="email" className="sign-in__input-label">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="sign-in__input"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="password" className="sign-in__input-label">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="sign-in__input"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit" className="sign-in__submit-button button">
                  Sign In
                </button>
                <p className="sign-in__register-text">Don't have an account?</p>
                <Link to="/register">
                  <button
                    type="button"
                    className="sign-in__register-button button button_highlighted"
                  >
                    Register
                  </button>
                </Link>
              </form>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default SignInScreen;

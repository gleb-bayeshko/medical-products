import React from "react";
import { Helmet } from "react-helmet";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../actions/userActions";
import Preloader from "../preloaders/Preloader";

function RegisterScreen(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [isPasswordsMatch, setIsPasswordsMatch] = useState(true);
  const [name, setName] = useState("");
  const userRegister = useSelector((state) => state.userRegister);
  const { loading, userInfo, error } = userRegister;

  const dispatch = useDispatch();

  useEffect(() => {
    if (userInfo) {
      props.history.push("/");
    }
  }, [userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (password !== passwordRepeat) {
      setIsPasswordsMatch(false);
      return;
    }

    dispatch(register(name, email, password));
  };

  return (
    <>
      <Helmet>
        <title>Registration</title>
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
            <h2 className="sign-in__title">Registration</h2>
            <form className="sign-in__form" onSubmit={submitHandler}>
              {error && <div className="auth-warning-message">{error}</div>}
              <label htmlFor="name" className="sign-in__input-label">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="sign-in__input"
                onChange={(e) => setName(e.target.value)}
              />
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
              {!isPasswordsMatch && (
                <p className="auth-warning-message">
                  The entered passwords do not match with each other!
                </p>
              )}
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
              <label htmlFor="password-repeat" className="sign-in__input-label">
                Repeat password
              </label>
              <input
                type="password"
                name="password-repeat"
                id="password-repeat"
                className="sign-in__input"
                onChange={(e) => setPasswordRepeat(e.target.value)}
              />
              <button
                type="submit"
                className="sign-in__register-button register-button button button_highlighted"
              >
                Create account
              </button>
            </form>
          </div>
        </div>
      </section>
      )}
    </>
  );
}

export default RegisterScreen;

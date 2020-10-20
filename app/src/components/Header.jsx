import React, { Component } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import logo from "../assets/img/logo/logo.png";

function Header() {
  const productsInCartList = useSelector(
    (state) => state.productsToCart.products
  );

  return (
    <header className="header">
      <div className="wrapper">
        <div className="layout-3-columns header__layout">
          <div className="header__logo">
            <Link to="/">
              <img src={logo} alt="logo" className="logo-png" />
            </Link>
            <div className="header__title">
              <h1>Medical products</h1>
              <p className="tagline">Care and health</p>
            </div>
          </div>
          <div className="header__search">
            <form className="search-form">
              <input
                type="text"
                className="search-form__input header__search-input"
                placeholder="Enter..."
              />
              <button
                type="submit"
                className="search-form__button header__search-button"
              >
                Search
              </button>
            </form>
          </div>
          <div className="header__links">
            <a href="#" className="sign-in-ref">
              Sign In
            </a>
            <Link to="/cart" className="cart-ref">
              <button className="cart header__cart button">
                <div className="cart__number-of-goods">
                  <div className="cart-icon"></div>
                  <span className="number-of-goods">
                    {productsInCartList.reduce((acc, current) => acc += current.qty, 0)}
                  </span>
                </div>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;

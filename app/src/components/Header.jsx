import React from "react";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import logo from "../assets/img/logo/logo.png";
import { DEFAULT_AVATAR } from "../constants/userConstants";

function Header() {
  const history = useHistory();
  const productsInCartList = useSelector(
    (state) => state.productsToCart.products
  );

  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo } = userSignIn;

  const handleAvatarError = (e) =>{
    e.preventDefault();
    (e.target.src = DEFAULT_AVATAR);
  }

  return (
    <header className="header">
      <div className="wrapper">
        <div className="layout-2-columns header__layout">
          <div className="header__logo">
            <Link to="/">
              <img src={logo} alt="logo" className="logo-png" />
            </Link>
            <div className="header__title">
              <h1>Medical products</h1>
              <p className="tagline">Care and health</p>
            </div>
          </div>
          <div className="header__links">
            {
              userInfo ? (
                <Link to={userInfo.isAdmin ? `/product-admin` : '/profile'} className="sign-in-ref">
                  {userInfo.isAdmin ? <><span className="sign-in_admin">Admin: </span> {`${userInfo.name}`}</> : userInfo.name}
                  {!userInfo.isAdmin &&
                    <img src={userInfo.avatar || DEFAULT_AVATAR} className="avatar-mini header__avatar" alt="avatar" onError={handleAvatarError}/>
                  }
                </Link>
              ) : (
                <Link to="/signin" className="sign-in-ref">
                  Sign In
                </Link>
              )
            }
            <Link to="/cart" className="cart-ref">
              <button className="cart header__cart button">
                <div className="cart__number-of-goods">
                  <div className="cart-icon"></div>
                  <div className="number-of-goods-container">
                    <span className="number-of-goods">
                      {productsInCartList.reduce((acc, current) => acc += current.qty, 0)}
                    </span>
                  </div>
                  
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

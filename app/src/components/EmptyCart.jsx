import React from "react";
import { Link } from 'react-router-dom';

function EmptyCart(props) {
  return (
    <div className="cart-list-empty__layout">
      <div className="cart-list-empty__title">
        <h2>Your cart is empty</h2>
      </div>
      <div className="cart-list-empty__subtitle">
        <p>You can go back to the main page and order something... or you can console our poor cart</p>
      </div>
      <div className="cart-list-empty__img">
        <img src="/assets/img/empty-img/empty-cart.png" alt="empty-cart" className="empty-cart-img" />
      </div>
      <Link to='/'>
        <button className="button cart-list-empty__button">Go to Main page</button>
      </Link>
    </div>
  );
}

export default EmptyCart;

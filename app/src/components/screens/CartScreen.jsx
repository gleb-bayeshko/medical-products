import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';

import EmptyCart from "../EmptyCart";
import ProductInCartBlock from '../ProductInCartBlock';

import { cleanCart } from '../../actions/cartActions';

function CartScreen(props) {
  const productsInCartList = useSelector((state) => state.productsToCart.products);
  const dispatch = useDispatch();

  const clean = () => {
    dispatch(cleanCart())
  }


  return (
    <section className="cart-list">
      <div className="wrapper">
        {productsInCartList.length === 0 ? (
          <EmptyCart />
        ) : (
          <>
            <div className="layout-2-columns cart-list__title-layout">
              <div className="cart-list__title">
                <div className="cart-icon cart-list__icon"></div>
                <h2>Cart</h2>
              </div>
              <div className="cart-list__clean-cart" onClick={clean}>
                <div className="svg-container">
                  <svg
                    className="trash-icon cart-list__trash-icon"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    x="0px"
                    y="0px"
                    viewBox="0 0 1000 1000"
                    enableBackground="new 0 0 1000 1000"
                    xmlSpace="preserve"
                  >
                    <metadata>
                      {" "}
                      Svg Vector Icons : http://www.onlinewebfonts.com/icon{" "}
                    </metadata>
                    <g>
                      <g transform="translate(0.000000,511.000000) scale(0.100000,-0.100000)">
                        <path d="M3300,4963.4c-132-52.4-196-99-300.8-209.6c-178.5-188.2-221.2-328-221.2-737.4v-287.2l-1158.5-3.9L459,3719.5l-5.8-188.2l-5.8-190.2l655.9-3.9l655.9-5.8l9.7-3648.3l9.7-3648.3l44.6-108.7c132-328,397.8-578.3,720-677.3c118.4-36.9,192.1-38.8,2456.8-38.8c2264.7,0,2338.4,1.9,2456.8,38.8c322.2,99,588,349.3,720,677.3l44.6,108.7l9.7,3648.3l9.7,3648.3l655.9,5.8l655.9,3.9l-5.8,190.2l-5.8,188.2l-1158.5,5.8l-1156.6,3.9l-7.8,335.7c-7.8,285.3-13.6,349.3-50.4,440.5c-81.5,201.8-269.7,386.2-479.3,463.8c-106.7,40.8-137.8,40.8-1694.1,40.8H3408.7L3300,4963.4z M6626.2,4594.7c81.5-33,161.1-128.1,188.2-221.2c9.7-38.8,19.4-199.9,19.4-357.1v-287.2H5000H3166.1v287.2c0,316.3,15.5,399.8,91.2,491c99,118.4,29.1,112.5,1738.8,114.5C6276.9,4621.9,6575.8,4618,6626.2,4594.7z M7839.1-301.4l-5.8-3644.4l-40.8-89.2c-60.1-130-168.8-240.6-295-302.8l-110.6-54.3H5000H2613.1l-110.6,54.3c-126.1,62.1-234.8,172.7-295,302.8l-40.8,89.2l-5.8,3644.4l-3.9,3642.5h2843h2843L7839.1-301.4z" />
                        <path d="M3127.3-569.2v-2862.4h194.1h194.1v2862.4v2862.4h-194.1h-194.1V-569.2z" />
                        <path d="M4815.7-569.2v-2864.3l190.2,5.8l188.2,5.8l5.8,2858.5l3.9,2856.6h-194.1h-194.1V-569.2z" />
                        <path d="M6484.6-569.2v-2862.4h194.1h194.1v2862.4v2862.4h-194.1h-194.1V-569.2z" />
                      </g>
                    </g>
                  </svg>
                </div>
                <p>Empty cart</p>
              </div>
            </div>
            <div className="cart-list__form">
              {productsInCartList.map((product) => {
                return (
                  <ProductInCartBlock product={product} />
                );
              })}
              <div className="cart-list__bottom">
                <div className="layout-2-columns cart-list__total">
                  <div className="cart-list__total-qty">
                    <p>
                      Total quantity: <span className="total-qty__number">{productsInCartList.reduce((acc, current) => acc += current.qty, 0)} pcs.</span>
                    </p>
                  </div>
                  <div className="cart-list__order-price">
                    <p>
                      Order-price: <span className="order-price__sum-number">{productsInCartList.reduce((acc, current) => acc += current.price * current.qty, 0)}</span>{" "}
                      <span className="currency-icon order-price__currency">
                        $
                      </span>
                    </p>
                  </div>
                </div>
                <div className="layout-2-columns cart-list__buttons">
                  <Link to="/">
                    <button
                      className="button button_inverted cart-list__button"
                    >
                      Go back
                    </button>
                  </Link>
                  <button className="button cart-list__button">Pay now</button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default CartScreen;

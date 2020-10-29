import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { productDelete, productInCartQty } from "../actions/cartActions";

import CounterPanel from "./CounterPanel";
import ClothesColors from "./ProductBlock/ClothesColors";

function ProductInCartBlock(props) {
  const [counter, setCounter] = useState(props.product.qty);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(productInCartQty(props.product._id, counter));
  }, [counter]);

  useEffect(() => {
    setCounter(props.product.qty);
  }, [props.product.qty]);

  const deletePosition = () => {
    dispatch(productDelete(props.product._id));
  };

  return (
    <div className="cart-list__item" key={`cart-product_${props.product._id}`}>
      <div className="cart-list__img">
        <img src={props.product.image} alt="product" className="cart-img" />
      </div>
      <div className="cart-list__description">
        <Link
          to={`/products/${props.product.category.toLowerCase()}/${props.product._id}`}
          className="link_not-underlined"
        >
          <h4 className="cart-list__item-title">{props.product.name}</h4>
        </Link>
        <div className="product-block__rating rating">
          <i className="fas fa-star rating__star"></i>
          <i className="fas fa-star rating__star"></i>
          <i className="fas fa-star rating__star"></i>
          <i className="fas fa-star-half-alt rating__star"></i>
          <i className="far fa-star rating__star"></i>
        </div>
        {props.product.color !== undefined && props.product.color.length !== 0 && (
          <div className="cart-list__color">
            <p>Color:</p>
            <ClothesColors
              isSelectable={false}
              colors={[props.product.colorActive]}
            />
          </div>
        )}
      </div>
      <CounterPanel counter={counter} setCounter={setCounter} />
      <div className="cart-list__cost">
        <span className="item-price cart-list__price">
          {(props.product.price * props.product.qty).toFixed(2)}
        </span>
        <span className="currency-icon cart-list__currency-icon">$</span>
      </div>
      <div className="cart-list__close" onClick={deletePosition}>
        <div className="svg-container">
          <svg
            id="Outlined"
            className="close-icon"
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title />
            <g id="Fill">
              <path d="M16,2A14,14,0,1,0,30,16,14,14,0,0,0,16,2Zm0,26A12,12,0,1,1,28,16,12,12,0,0,1,16,28Z" />
              <polygon points="19.54 11.05 16 14.59 12.46 11.05 11.05 12.46 14.59 16 11.05 19.54 12.46 20.95 16 17.41 19.54 20.95 20.95 19.54 17.41 16 20.95 12.46 19.54 11.05" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}

export default ProductInCartBlock;

import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { productsToCart } from "../../actions/productActions";

import ClothesColor from "./ClothesColors";

function ProductBlock(props) {
  const productData = props.productData;
  const productsInCartList = useSelector(
    (state) => state.productsToCart.products
  );
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [activeColorName, setActiveColorName] = useState(null);
  const colorPopUpRef = useRef(null);

  const dispatch = useDispatch();

  const dispatchToCart = () => {
    if (productData.color !== null && !activeColorName) {
      colorPopUpRef.current.classList.add("clothes-color__pop-up_shown");
      return;
    }
    dispatch(productsToCart(productData, 1, activeColorName));
  };

  useEffect(() => {
    if (productsInCartList.some((product) => product._id === productData._id)) {
      setIsAddedToCart(true);
    }
  }, [productsInCartList, productData._id]);

  return (
    <div className="product-block">
      <div className="product-block__top">
        <div className="product-block__img">
          <Link to={`/products/${productData.category}/${productData._id}`}>
            <img
              src={productData.image}
              alt="product"
              className="product-img"
            />
          </Link>
        </div>
        <div className="product-block__title">
          <Link to={`/products/${productData.category}/${productData._id}`}>
            <h4>{productData.name}</h4>
          </Link>
          <div className="product-block__rating rating">
            <i className="fas fa-star rating__star"></i>
            <i className="fas fa-star rating__star"></i>
            <i className="fas fa-star rating__star"></i>
            <i className="fas fa-star-half-alt rating__star"></i>
            <i className="far fa-star rating__star"></i>
          </div>
          <div className="product-block__clothes-colors clothes-colors">
            <ClothesColor
              colors={productData.color}
              productId={productData._id}
              activeColorName={activeColorName}
              setActiveColorName={setActiveColorName}
              isSelectable={true}
            />
            <div ref={colorPopUpRef} className="clothes-color__pop-up">
              Choose color
            </div>
          </div>
        </div>
      </div>
      <div className="product-block__bottom">
        <div className="product-block__price">
          <span className="item-price">{productData.price}</span>
          <span className="currency-icon price-currency">$</span>
        </div>
        {isAddedToCart ? (
          <Link to="/cart">
            <div
              className="add-button button button_inverted add-button__added"
              onClick={dispatchToCart}
            >
              <div className="add-button__layout">
                <span className="add-button__text">Added</span>
              </div>
            </div>
          </Link>
        ) : (
          <div
            className="add-button button button_inverted"
            onClick={dispatchToCart}
          >
            <div className="add-button__layout">
              <span className="add-button__text">Add</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductBlock;

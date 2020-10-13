import React, { Component } from "react";
import { Link } from "react-router-dom";

import ClothesColor from './ClothesColors';

class ProductBlock extends Component {
  render() {
    const productData = this.props.productData;

    return (
      <div className="product-block">
        <div className="product-block__top">
          <div className="product-block__img">
            <Link to={`/products/${productData._id}`}>
              <img
                src={productData.image}
                alt="product"
                className="product-img"
              />
            </Link>
          </div>
          <div className="product-block__title">
            <Link to={`/products/${productData._id}`}>
              <h4>
              {productData.name}
              </h4>
            </Link>
            <div className="product-block__rating rating">
                    <i className="fas fa-star rating__star"></i>
                    <i className="fas fa-star rating__star"></i>
                    <i className="fas fa-star rating__star"></i>
                    <i className="fas fa-star-half-alt rating__star"></i>
                    <i className="far fa-star rating__star"></i>
                  </div>
            <div className="product-block__clothes-colors clothes-colors">
              <ClothesColor colors={productData.color} productId={productData._id} />
            </div>
          </div>
        </div>
        <div className="product-block__bottom">
          <div className="product-block__price">
            <span className="item-price">{productData.price}</span>
            <span className="currency-icon price-currency">$</span>
          </div>
          <div className="add-button button button_inverted ">
            <div className="layout-2-columns add-button__layout">
              <span className="add-button__text">+ Add</span>
              <span className="add-button__qty">0</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductBlock;
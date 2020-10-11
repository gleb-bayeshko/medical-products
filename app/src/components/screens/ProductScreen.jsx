import React, { Component } from "react";
import data from "../../data";

import ClothesColor from "../ProductBlock/ClothesColors";

class ProductScreen extends Component {
  render() {
    let productId = this.props.match.params.id;

    const product = data.products.find(
      (currentProduct) => currentProduct._id === productId
    );
    return (
      <section className="product-content">
        <div className="wrapper">
          <div className="layout-2-columns product-content__product-layout">
            <div className="product-content__image">
              <img
                src={product.image}
                alt="product-img"
                className="product-img"
              />
            </div>
            <div className="product-content__details">
              <div className="product-content__title">
                <a href="#" className="link_not-underlined">
                  <h4 className="product-content__header">{product.name}</h4>
                </a>
                <div className="rating">
                  <i className="fas fa-star rating__star"></i>
                  <i className="fas fa-star rating__star"></i>
                  <i className="fas fa-star rating__star"></i>
                  <i className="fas fa-star-half-alt rating__star"></i>
                  <i className="far fa-star rating__star"></i>
                  <span className="rating__reviews-num">
                    <a href="#reviews">{product.reviewsNumber} reviews</a>
                  </span>
                </div>
                <div className="layout-2-columns product-content__price-and-counter-layout">
                  <div className="product-content__price">
                    <span className="item-price product-content__item-price">
                      {product.price}
                    </span>
                    <span className="currency-icon product-content__currency-icon">
                      $
                    </span>
                  </div>
                  <div className="counter-panel product-content__counter-panel">
                    <div className="counter-panel__controls counter-panel__controls_plus">
                      <p>+</p>
                    </div>
                    <div className="cart-list__qty counter-panel__qty">1</div>
                    <div className="counter-panel__controls counter-panel__controls_minus">
                      <p>-</p>
                    </div>
                  </div>
                </div>
                <h4 className="colors-description">Colors:</h4>
                <div className="clothes-colors">
                  <ClothesColor colors={product.color} />
                </div>
                <div className="product-content__description">
                  <p className="product-content__description-text">
                    {product.description}
                  </p>
                </div>
                <div className="add-button button button_inverted product-content__add-button">
                  <span className="add-button__text">Add to cart</span>
                </div>
              </div>
            </div>
          </div>
          <div className="product-content__reviews">
            <h3 className="reviews-title" id="reviews">
              Reviews:
            </h3>
            <div className="review">
              <div className="reviews__rating-container">
                <div className="reviews__nickname">
                  John <span className="review__date">2020-02-02</span>
                </div>
                <div className="rating reviews__rating">
                  <i className="fas fa-star rating__star review__star"></i>
                  <i className="fas fa-star rating__star review__star"></i>
                  <i className="fas fa-star rating__star review__star"></i>
                  <i className="fas fa-star-half-alt rating__star review__star"></i>
                  <i className="far fa-star rating__star review__star"></i>
                </div>
              </div>
              <div className="review__comment">It is awesome!</div>
            </div>
            <div className="review">
              <div className="reviews__rating-container">
                <div className="reviews__nickname">
                  John <span className="review__date">2020-02-02</span>
                </div>
                <div className="rating reviews__rating">
                  <i className="fas fa-star rating__star review__star"></i>
                  <i className="fas fa-star rating__star review__star"></i>
                  <i className="fas fa-star rating__star review__star"></i>
                  <i className="fas fa-star-half-alt rating__star review__star"></i>
                  <i className="far fa-star rating__star review__star"></i>
                </div>
              </div>
              <div className="review__comment">It is awesome!</div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default ProductScreen;

import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { detailsProduct, productsToCart } from "../../actions/productActions";
import CounterPanel from "../CounterPanel";

import ClothesColor from "../ProductBlock/ClothesColors";

import { Link } from "react-router-dom";
import Preloader from "../preloaders/Preloader";
import Rating from "../Rating";
import { DEFAULT_AVATAR } from "../../constants/userConstants";

function ProductScreen(props) {
  const productDetails = useSelector((state) => state.productDetails);
  const { userInfo } = useSelector((state) => state.userSignIn);
  const { product, loading, error } = productDetails;

  const params = props.match.params;

  const [counter, setCounter] = useState(1);
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  const [activeColorName, setActiveColorName] = useState(null);
  const colorPopUpRef = useRef(null);

  const ratingValues = [1, 2, 3, 4, 5];
  const ratingStars = useRef([]);
  const [ratingSelected, setRatingSelected] = useState(null);
  const [commentText, setCommentText] = useState("");
  const [reviewFieldsError, setReviewFieldsError] = useState("");
  const [isReviewSent, setIsReviewSent] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [productRating, setProductRating] = useState(0);
  const [productReviewsNumber, setProductReviewsNumber] = useState(0);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(detailsProduct(params.id, params.category));
  }, []);

  const dispatchToCart = () => {
    if (product.color.length !== 0 && !activeColorName) {
      colorPopUpRef.current.classList.add("clothes-color__pop-up_shown");
      return;
    }

    dispatch(productsToCart(product, counter, activeColorName));
    setIsAddedToCart(true);
  };

  const handleRatingHover = (e) => {
    if (!e.target.dataset.rating) return;

    const currentRating = e.target.dataset.rating;
    const stars = ratingStars.current;

    for (let i = 0; i < currentRating; i++) {
      stars[i].classList.remove("far");
      stars[i].classList.add("fas");
    }
  };

  const handleRatingSelect = (e) => {
    if (!e.target.dataset.rating) return;
    setReviewFieldsError("");

    const currentRating = e.target.dataset.rating;
    const stars = ratingStars.current;

    setRatingSelected(currentRating);

    stars.forEach((star) => {
      star.classList.remove("fas");
      star.classList.add("far");
    });
    for (let i = 0; i < currentRating; i++) {
      stars[i].classList.add("fas");
    }
  };

  const handleRatingOut = () => {
    const stars = ratingStars.current;
    for (let i = 0; i < stars.length; i++) {
      if (ratingSelected) {
        if (i + 1 > ratingSelected) {
          stars[i].classList.remove("fas");
          stars[i].classList.add("far");
        } else continue;
      } else {
        stars[i].classList.remove("fas");
        stars[i].classList.add("far");
      }
    }
  };

  const handleSendButton = async (e) => {
    e.preventDefault();
    if (!ratingSelected || !commentText) {
      setReviewFieldsError("Required fields must be filled");
      console.log("error");
      return;
    } else {
      setReviewFieldsError("");
    }
    try {
      const comments = await axios.post(
        "/api/product-comments/create-review",
        {
          productId: product._id,
          userId: userInfo._id,
          userRating: ratingSelected,
          userComment: commentText,
          userReviewDate: Date.now(),
        },
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      setIsReviewSent(true);
    } catch (error) {
      console.log(error);
      setReviewFieldsError(error.response.data);
    } finally {
      setCommentText('');
      setRatingSelected(null);
    }
  };

  const handleCommentText = (e) => {
    setReviewFieldsError("");

    setCommentText(e.target.value);
  };

  const loadReviews = async (productId) => {
    const reviews = await axios.post("/api/product-comments/reviews", {
      productId,
    });
    console.log(reviews.data);
    setReviews(reviews.data);
  };

  const setReviewDate = (milliseconds) => {
    const date = new Date(milliseconds);

    return date.toLocaleString().replace(/\//g, '.');
  }

  const loadProductRatingAndReviewsNum = async (productId) => {
    const productRatingAndReviewsNum = await axios.post('/api/product-comments/product-rating', { productId });
    setProductRating(productRatingAndReviewsNum.data.rating || 0);
    setProductReviewsNumber(productRatingAndReviewsNum.data.reviewsNumber || 0);
  }

  useEffect(() => {
    if (loading || !product) return;
    loadReviews(product._id);
    loadProductRatingAndReviewsNum(product._id);
  }, [isReviewSent, loading]);

  return loading ? (
    <section className="content">
      <div className="wrapper">
        <Preloader />
      </div>
    </section>
  ) : error ? (
    <div>{error}</div>
  ) : (
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
              <div className="product-content__rating-and-reviews-num">
                {console.log(productRating)}
                <Rating rating={productRating} />
                <span className="rating__reviews-num">
                  <a href="#reviews">{productReviewsNumber} reviews</a>
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
                <CounterPanel
                  addCounterClass="product-content__counter-panel"
                  counter={counter}
                  setCounter={setCounter}
                />
              </div>
              {product.color !== undefined && product.color.length !== 0 && (
                <>
                  <h4 className="colors-description">Colors:</h4>
                  <div className="clothes-colors">
                    <ClothesColor
                      colors={product.color}
                      id={product._id}
                      activeColorName={activeColorName}
                      setActiveColorName={setActiveColorName}
                      isSelectable={true}
                    />
                    <div ref={colorPopUpRef} className="clothes-color__pop-up">
                      Choose color
                    </div>
                  </div>
                </>
              )}
              <div className="product-content__description">
                <p className="product-content__description-text">
                  {product.description}
                </p>
              </div>
              {isAddedToCart ? (
                <Link to="/cart">
                  <div
                    className="add-button button button_inverted product-content__add-button add-button__added"
                    onClick={dispatchToCart}
                  >
                    <span className="add-button__text">Added to cart</span>
                  </div>
                </Link>
              ) : (
                <div
                  className="add-button button button_inverted product-content__add-button"
                  onClick={dispatchToCart}
                >
                  <span className="add-button__text">Add to cart</span>
                </div>
              )}
            </div>
            <div className="product-content__reviews">
              <h3 className="reviews-title" id="reviews">
                Reviews:
              </h3>
              {reviews.length === 0 ? (
                <p className="reviews__no-reviews">This product has no reviews yet. Be the first!</p>
              ) : (
                reviews.map((review) => {
                  return (
                    <div className="review">
                      <div className="review__layout">
                        <div className="review__avatar-container">
                          <img src={review.userAvatar || DEFAULT_AVATAR} alt="avatar" className="review__avatar" />
                        </div>
                        <div className="reviews__rating-container">
                          <div className="reviews__nickname">
                            {`${review.userName}${review.userSecondName ? ` ${review.userSecondName}` : ''}`}
                            <div className="review__date">{setReviewDate(review.userReviewDate)}</div>
                          </div>
                          <Rating rating={review.userRating} starClass={`review__star`} starContainerClass={`reviews__rating`}/>
                          <div className="review__comment">{review.userComment}</div>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
              {userInfo ? (
                <form className="review-form">
                  <h4 className="review-form__title">Leave a review:</h4>
                  {reviewFieldsError && (
                    <div className="auth-warning-message">
                      {reviewFieldsError}
                    </div>
                  )}
                  <div className="review-form__rating-container">
                    <h5 className="review-form__subtitle">
                      Rate<span className="asterisk-required">*</span>:
                    </h5>
                    <div
                      className="rating review-form__rating"
                      onMouseOver={handleRatingHover}
                      onMouseOut={handleRatingOut}
                      onClick={handleRatingSelect}
                    >
                      {ratingValues.map((value, i) => {
                        return (
                          <i
                            className="far fa-star review-form__star"
                            data-rating={`${value}`}
                            ref={(el) => (ratingStars.current[i] = el)}
                          ></i>
                        );
                      })}
                    </div>
                  </div>
                  <h5 className="review-form__subtitle">
                    Write a comment<span className="asterisk-required">*</span>:
                  </h5>
                  <textarea
                    className="review-form__review-input"
                    name="review"
                    id="review"
                    onChange={handleCommentText}
                    value={commentText}
                    rows="5"
                  ></textarea>
                  <button
                    type="submit"
                    className="review-form__button-send"
                    onClick={handleSendButton}
                  >
                    Send
                  </button>
                </form>
              ) : (
                <div className="review-form__auth-required">
                  <h4 className="review-form__auth-required-title">
                    Only authorized users can leave reviews
                  </h4>
                  <Link
                    to={{
                      pathname: "/signin",
                      state: { isAvailableToGoBack: true },
                    }}
                  >
                    <button className="review-form__auth-required-button">
                      Sign in
                    </button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductScreen;

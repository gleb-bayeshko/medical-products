import React, { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { sortProducts } from "../actions/productActions";
import {
  PRODUCTS_SORT_DATE_ASC,
  PRODUCTS_SORT_DATE_DESC,
  PRODUCTS_SORT_RATING_ASC,
  PRODUCTS_SORT_RATING_DESC,
} from "../constants/productConstants";

function TopBar(props) {
  const popUpRef = useRef();
  const dispatch = useDispatch();

  const [isDirectionDesc, setIsDirectionDesc] = useState(true);
  const [sortType, setSortType] = useState("date");

  const checkActive = (current) => {
    if (props.currentCategory.toLowerCase() === current.toLowerCase()) {
      return "categories__link_active";
    } else {
      return "";
    }
  };

  const popUpShow = () => {
    popUpRef.current.classList.toggle("sort-pop-up_shown");
  };

  useEffect(() => {
    switch (sortType) {
      case "date":
        const handleDateSort = () => {
          if (isDirectionDesc) {
            dispatch(sortProducts(PRODUCTS_SORT_DATE_DESC));
          } else {
            dispatch(sortProducts(PRODUCTS_SORT_DATE_ASC));
          }
        };
        handleDateSort();
        break;
      case "rating":
        const handleRatingSort = () => {
          if (isDirectionDesc) {
            dispatch(sortProducts(PRODUCTS_SORT_RATING_DESC));
          } else {
            dispatch(sortProducts(PRODUCTS_SORT_RATING_ASC));
          }
        };
        handleRatingSort();
        break;
      default:
        return;
    }
  }, [sortType, isDirectionDesc, dispatch]);

  const handleDirectionSort = () => {
    setIsDirectionDesc(!isDirectionDesc);
  };

  return (
    <section className="top-bar">
      <div className="wrapper">
        <div className="layout-2-columns top-bar__layout">
          <div className="top-bar__categories">
            <ul className="categories top-bar__categories-list">
              <li
                className={`categories__link top-bar__link ${checkActive(
                  "All"
                )}`}
              >
                <Link to="/products/all">All</Link>
              </li>
              <li
                className={`categories__link top-bar__link ${checkActive(
                  "Scrubs"
                )}`}
              >
                <Link to="/products/scrubs">Scrubs</Link>
              </li>
              <li
                className={`categories__link top-bar__link ${checkActive(
                  "Shoes"
                )}`}
              >
                <Link to="/products/shoes">Shoes</Link>
              </li>
              <li
                className={`categories__link top-bar__link ${checkActive(
                  "Stethoscopes"
                )}`}
              >
                <Link to="/products/stethoscopes">Stethoscopes</Link>
              </li>
            </ul>
          </div>
          <div className="top-bar__sort-container sort-container">
            <div className="top-bar__sort sort">
              <b
                onClick={handleDirectionSort}
                className={
                  isDirectionDesc
                    ? `sort-by sort-by_desc`
                    : `sort-by sort-by_asc`
                }
              >
                Sort by:
              </b>
              <span className="sort-category" onClick={popUpShow}>
                {sortType}
              </span>
            </div>
            <div className="sort-pop-up" ref={popUpRef}>
              <ul>
                <li
                  className={`sort-pop-up__link ${
                    sortType === "date" ? `sort-pop-up__link_active` : ""
                  }`}
                  onClick={() => setSortType("date")}
                >
                  date
                </li>
                <li
                  className={`sort-pop-up__link ${
                    sortType === "rating" ? `sort-pop-up__link_active` : ""
                  }`}
                  onClick={() => setSortType("rating")}
                >
                  rating
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TopBar;

import React, { Component } from "react";
import { Link } from "react-router-dom";

function TopBar(props) {
  const checkActive = (current) => {
    if (props.currentCategory.toLowerCase() === current.toLowerCase()) {
      return 'categories__link_active'
    } else {
      return ''
    }
  }

  return (
    <section className="top-bar">
      <div className="wrapper">
        <div className="layout-2-columns top-bar__layout">
          <div className="top-bar__categories">
            <ul className="categories top-bar__categories-list">
              <li className={`categories__link top-bar__link ${checkActive('All')}`}>
                <Link to="/products/all">All</Link>
              </li>
              <li className={`categories__link top-bar__link ${checkActive('Scrubs')}`}>
                <Link to="/products/scrubs">Scrubs</Link>
              </li>
              <li className={`categories__link top-bar__link ${checkActive('Shoes')}`}>
                <Link to="/products/shoes">Shoes</Link>
              </li>
              <li className={`categories__link top-bar__link ${checkActive('Stethoscopes')}`}>
                <Link to="/products/stethoscopes">Stethoscopes</Link>
              </li>
            </ul>
          </div>
          <div className="top-bar__sort-container sort-container">
            <div className="top-bar__sort sort">
              <b>Sort by:</b>
              <span>newest</span>
            </div>
            <div className="sort-pop-up">
              <ul>
                <li className="sort-pop-up__link sort-pop-up__link_active">
                  newest
                </li>
                <li className="sort-pop-up__link">oldest</li>
                <li className="sort-pop-up__link">highest</li>
                <li className="sort-pop-up__link">lowest</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TopBar;

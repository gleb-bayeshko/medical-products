import React, { Component } from "react";

class TopBar extends Component {
  render() {
    return (
      <section className="top-bar">
        <div className="wrapper">
          <div className="layout-2-columns top-bar__layout">
            <div className="top-bar__categories">
              <ul className="categories top-bar__categories-list">
                <li className="categories__link categories__link_active top-bar__link">
                  <a href="/category/all">All</a>
                </li>
                <li className="categories__link top-bar__link">
                  <a href="/category/scrubs">Scrubs</a>
                </li>
                <li className="categories__link top-bar__link">
                  <a href="/category/shoes">Shoes</a>
                </li>
                <li className="categories__link top-bar__link">
                  <a href="/category/stethoscopes">Stethoscopes</a>
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
}

export default TopBar;

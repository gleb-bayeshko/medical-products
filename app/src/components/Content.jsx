import React, { Component } from "react";
import ProductBlock from './ProductBlock/ProductBlock';
import data from '../data';

class Content extends Component {
  render() {
    return (
      <section className="content">
        <div className="wrapper">
          <div className="content__title">
            <h2>All</h2>
          </div>
          <div className="content__items">
            <div className="layout-4-columns items-layout">
              {
                data.products.map(product => <ProductBlock productData={product} />)
              }
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Content;

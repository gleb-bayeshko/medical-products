import React, { useEffect } from "react";
import ProductBlock from "./ProductBlock/ProductBlock";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";

function Content() {
  const productList = useSelector((state) => state.productList);

  const { products, loading, error } = productList;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listProducts());
  }, []);

  return loading ? (
    <section className="content">
      <div className="wrapper">
        <div className="preloader-container content__preloader-container">
          <img
            src="/assets/preloader/preloader.gif"
            alt="Loading"
            className="preloader-img"
          />
        </div>
      </div>
    </section>
  ) : error ? (
    <div>{error}</div>
  ) : (
    <section className="content">
      <div className="wrapper">
        <div className="content__title">
          <h2>All</h2>
        </div>
        <div className="content__items">
          <div className="layout-4-columns items-layout">
            {products.map((product) => (
              <ProductBlock productData={product} key={product._id} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Content;

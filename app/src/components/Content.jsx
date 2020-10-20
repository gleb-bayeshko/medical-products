import React, { useEffect } from "react";
import ProductBlock from "./ProductBlock/ProductBlock";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";
import Preloader from "./preloaders/Preloader";

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
        <Preloader />
      </div>
    </section>
  ) : error ? (
    <section className="content">
      <div className="wrapper">{error}</div>
    </section>
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

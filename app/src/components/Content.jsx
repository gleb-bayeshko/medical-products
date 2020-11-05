import React, { useEffect } from "react";
import ProductBlock from "./ProductBlock/ProductBlock";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";
import Preloader from "./preloaders/Preloader";
import { useState } from "react";
import TopBar from "./TopBar";

function Content(props) {
  const productList = useSelector((state) => state.productList);
  const { products, loading, error } = productList;

  const { sortType } = useSelector((state) => state.sortProducts);

  const [category, setCategory] = useState(props.productCategory || "all");
  const dispatch = useDispatch();

  useEffect(() => {
    if (props.productCategory) {
      setCategory(props.productCategory);
    }
  }, [props.productCategory]);

  useEffect(() => {
    dispatch(listProducts(category, sortType));
  }, [category, sortType]);

  return (
    <>
      <TopBar currentCategory={category} />
      {loading ? (
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
              <h2>{`${category[0].toUpperCase()}${category.slice(1)}`}</h2>
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
      )}
    </>
  );
}

export default Content;

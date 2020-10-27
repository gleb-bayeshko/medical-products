import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, listProducts } from "../../actions/productActions";
import CreateProduct from "../CreateProduct";
import Preloader from "../preloaders/Preloader";

function ProductCreateScreen(props) {
  const productList = useSelector((state) => state.productList);
  const { loading, products, error } = productList;

  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [fields, setFields] = useState({});

  const productCreate = useSelector((state) => state.productCreate);
  const { successCreation } = productCreate;

  const productDelete = useSelector((state) => state.productDelete);
  const { successDeletion } = productDelete;

  const dispatch = useDispatch();

  const handleCreateButton = (e) => {
    e.preventDefault();

    setCreateModalVisible(true);
  };

  const handleEditButton = (product) => {
    setFields(product);
    setCreateModalVisible(true);
  }

  const handleDeleteButton = (product) => {
    dispatch(deleteProduct(product._id));
  }

  useEffect(() => {
    if (!createModalVisible) {
      setFields({});
    }
  }, [createModalVisible])

  useEffect(() => {
    if(successCreation) {
      setCreateModalVisible(false);
    }
    dispatch(listProducts());
  }, [successCreation, successDeletion])

  return (
    <>
      {createModalVisible ? (
        <CreateProduct setVisibility={setCreateModalVisible} fields={fields}/>
      ) : loading ? (
          <section className="product-admin">
            <div className="wrapper">
              <Preloader />
            </div>
          </section>
        ) : error ? (
          <section className="product-admin">
            <div className="wrapper">
            {error && error.errors
              ? error.errors.map((currentError) => {
                  return (
                    <div className="auth-warning-message">
                      {currentError.msg}
                    </div>
                  );
                })
              : error &&
                error.message && (
                  <div className="auth-warning-message">{error.message}</div>
                )}
            </div>
          </section>
        ) :(
        <section className="product-admin">
          <div className="wrapper">
            <h2 className="product-admin__title">Products</h2>
            <button
              type="button"
              className="button button_highlighted"
              onClick={handleCreateButton}
            >
              Create new product
            </button>
            <div className="product-admin__product-list">
              <table>
                <thead>
                  <tr className="product-admin__row-title">
                    <th>ID</th>
                    <th>NAME</th>
                    <th>PRICE</th>
                    <th>CATEGORY</th>
                    <th>BRAND</th>
                    <th>ACTION</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    products.map(product => {
                      return (
                        <tr  className="product-admin__row" key={`product-table-row_${product._id}`}>
                          <td className="product-admin__id">{product._id}</td>
                          <td>{product.name}</td>
                          <td>{product.price}</td>
                          <td>{product.category}</td>
                          <td>{product.brand}</td>
                          <td className="product-admin__action">
                            <button type="button" className="action-button" onClick={() => handleEditButton(product)}>Edit</button>
                            <button type="button" className="action-button action-button_danger" onClick={() => handleDeleteButton(product)}>Delete</button>
                          </td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default ProductCreateScreen;

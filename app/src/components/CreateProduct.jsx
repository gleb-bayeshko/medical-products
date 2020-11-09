import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  cleanCreateProductError,
  createProduct,
} from "../actions/productActions";
import Preloader from "./Preloader";

function CreateProduct(props) {
  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo } = userSignIn;
  const [name, setName] = useState(props.fields.name || "");
  const [category, setCategory] = useState(props.fields.category || null);
  const [image, setImage] = useState(props.fields.image || "");
  const [color, setColor] = useState({
    blue: checkColor("blue"),
    red: checkColor("red"),
    orange: checkColor("orange"),
    green: checkColor("green"),
    black: checkColor("black"),
  });
  const [price, setPrice] = useState(props.fields.price || "");
  const [brand, setBrand] = useState(props.fields.brand || "");
  const [description, setDescription] = useState(
    props.fields.description || ""
  );
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingImageError, setUploadingImageError] = useState(false);

  const productCreate = useSelector((state) => state.productCreate);
  const { loadingCreation, errorCreation } = productCreate;

  const imagePathRef = useRef();

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();

    let colorArray = [];

    for (let key in color) {
      if (color[key]) {
        colorArray.push(key);
      }
    }

    dispatch(
      createProduct({
        _id: props.fields && props.fields._id,
        name,
        category,
        image,
        color: colorArray,
        price,
        brand,
        description,
      })
    );
  };

  const handleColor = (e) => {
    const target = e.target;
    setColor((prevState) => {
      if (!target.checked) {
        return { ...prevState, [target.value]: false };
      } else {
        return { ...prevState, [target.value]: true };
      }
    });
  };

  const handleUploadImage = (e) => {
    const imageUpload = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append("product-image", imageUpload);

    setUploadingImageError(false);
    setUploadingImage(true);
    axios
      .post("/api/uploads/product-image", bodyFormData, {
        headers: {
          "Content-type": "multipart/form-data",
          "Authorization": `Bearer ${userInfo.token}`
        },
      })
      .then((response) => {
        setImage(response.data);
        setUploadingImage(false);
      })
      .catch((error) => {
        setUploadingImage(false);
        setUploadingImageError(
          (error.response.data && error.response.data.message) || error
        );
      });
  };

  function checkColor(color) {
    return props.fields.color && props.fields.color.indexOf(color) >= 0;
  }

  useEffect(() => {
    dispatch(cleanCreateProductError());
  }, [dispatch]);

  useEffect(() => {
    imagePathRef.current.value = image;
  }, [image]);

  return loadingCreation ? (
    <section className="content">
      <div className="wrapper">
        <Preloader />
      </div>
    </section>
  ) : (
    <section className="create-product">
      <div className="wrapper">
        <div className="sign-in__container">
          <div className="create-product__top">
            <h2 className="create-product__title sign-in__title">
              {props.fields._id ? "Update product card" : "Create product card"}
            </h2>
            <button
              type="button"
              className="button create-button-back"
              onClick={() => props.setVisibility(false)}
            >
              Back
            </button>
          </div>
          <form
            className="sign-in__form create-product__form"
            onSubmit={submitHandler}
          >
            {errorCreation && errorCreation.errors ? (
              errorCreation.errors.map((currentError) => {
                return (
                  <div className="auth-warning-message">{currentError.msg}</div>
                );
              })
            ) : errorCreation && errorCreation.message ? (
              <div className="auth-warning-message">
                {errorCreation.message}
              </div>
            ) : (
              errorCreation && (
                <div className="auth-warning-message">
                  {window.scrollTo(0, 0)}
                  {errorCreation}
                </div>
              )
            )}
            <label htmlFor="name" className="sign-in__input-label">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              defaultValue={props.fields.name}
              className="sign-in__input"
              onChange={(e) => setName(e.target.value)}
            />
            <label htmlFor="category" className="sign-in__input-label">
              Category
            </label>
            <select
              name="category"
              id="category"
              defaultValue={props.fields.category || "DEFAULT"}
              className="sign-in__input"
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="DEFAULT" disabled>
                Choose category...
              </option>
              <option value="Scrubs">Scrubs</option>
              <option value="Shoes">Shoes</option>
              <option value="Stethoscopes">Stethoscopes</option>
            </select>
            <label htmlFor="image" className="sign-in__input-label">
              Image
            </label>
            <input
              type="text"
              name="image"
              id="image"
              ref={imagePathRef}
              defaultValue={props.fields.image}
              className="sign-in__input"
              onChange={(e) => setImage(e.target.value)}
            />
            <input
              type="file"
              name="image-upload"
              id="image-upload"
              onChange={handleUploadImage}
            />
            {uploadingImage && <div>Uploading...</div>}
            {uploadingImageError && (
              <div className="auth-warning-message">{uploadingImageError}</div>
            )}
            <fieldset className="colors-field">
              <legend className="sign-in__input-label">Color</legend>
              <div className="color-checkbox-container">
                <label htmlFor="color-blue">Blue</label>
                <input
                  type="checkbox"
                  name="color"
                  id="color-blue"
                  value="blue"
                  onChange={handleColor}
                  defaultChecked={checkColor("blue")}
                />
              </div>
              <div className="color-checkbox-container">
                <label htmlFor="color-red">Red</label>
                <input
                  type="checkbox"
                  name="color"
                  id="color-red"
                  value="red"
                  onChange={handleColor}
                  defaultChecked={checkColor("red")}
                />
              </div>
              <div className="color-checkbox-container">
                <label htmlFor="color-orange">Orange</label>
                <input
                  type="checkbox"
                  name="color"
                  id="color-orange"
                  value="orange"
                  onChange={handleColor}
                  defaultChecked={checkColor("orange")}
                />
              </div>
              <div className="color-checkbox-container">
                <label htmlFor="color-green">Green</label>
                <input
                  type="checkbox"
                  name="color"
                  id="color-green"
                  value="green"
                  onChange={handleColor}
                  defaultChecked={checkColor("green")}
                />
              </div>
              <div className="color-checkbox-container">
                <label htmlFor="color-black">Black</label>
                <input
                  type="checkbox"
                  name="color"
                  id="color-black"
                  value="black"
                  onChange={handleColor}
                  defaultChecked={checkColor("black")}
                />
              </div>
            </fieldset>
            <label htmlFor="price" className="sign-in__input-label">
              Price
            </label>
            <input
              type="number"
              name="price"
              id="price"
              defaultValue={props.fields.price}
              step="0.01"
              min="0"
              className="sign-in__input"
              onChange={(e) => setPrice(e.target.value)}
            />
            <label htmlFor="brand" className="sign-in__input-label">
              Brand
            </label>
            <input
              type="text"
              name="brand"
              id="brand"
              defaultValue={props.fields.brand}
              className="sign-in__input"
              onChange={(e) => setBrand(e.target.value)}
            />
            <label htmlFor="description" className="sign-in__input-label">
              Description
            </label>
            <textarea
              type="text"
              name="description"
              id="description"
              defaultValue={props.fields.description}
              rows="10"
              className="sign-in__input text-area-input"
              onChange={(e) => setDescription(e.target.value)}
            />
            <button
              type="submit"
              className="sign-in__submit-button button button_highlighted"
            >
              {props.fields._id ? "Update" : "Create"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default CreateProduct;

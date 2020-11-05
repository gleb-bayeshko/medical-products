import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_QTY_CHANGE,
  PRODUCT_DELETE,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_TO_CART,
  PRODUCT_TO_CART_UPDATE_AFTER_SIGN_IN,
  CART_CLEAN,
  PRODUCT_CREATION_REQUEST,
  PRODUCT_CREATION_SUCCESS,
  PRODUCT_CREATION_FAIL,
  PRODUCT_CREATION_CLEAN_ERROR,
  PRODUCT_DELETION_REQUEST,
  PRODUCT_DELETION_SUCCESS,
  PRODUCT_DELETION_FAIL,
  PRODUCT_CART_PRODUCTS_LIST_REQUEST,
  PRODUCT_CART_PRODUCTS_LIST_SUCCESS,
  PRODUCT_CART_PRODUCTS_LIST_FAIL,
  PRODUCT_CART_PRODUCTS_LIST_QTY_CHANGE,
  PRODUCTS_SORT_DATE_DESC,
  PRODUCTS_SORT_DATE_ASC,
} from "../constants/productConstants";

function productListReducer(state = { products: [] }, action) {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true, products: [] };
    case PRODUCT_LIST_SUCCESS:
      return { loading: false, products: action.payload };
    case PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

function sortProductsReducer(
  state = { sortType: PRODUCTS_SORT_DATE_DESC },
  action
) {
  switch (action.type) {
    case PRODUCTS_SORT_DATE_DESC:
      return { sortType: PRODUCTS_SORT_DATE_DESC };
    case PRODUCTS_SORT_DATE_ASC:
      return { sortType: PRODUCTS_SORT_DATE_ASC };
    default:
      return state;
  }
}

function loadCartProductsReducer(
  state = { cartProducts: [], loadingCartProducts: true },
  action
) {
  switch (action.type) {
    case PRODUCT_CART_PRODUCTS_LIST_REQUEST:
      return { loadingCartProducts: true, products: [] };
    case PRODUCT_CART_PRODUCTS_LIST_SUCCESS:
      return { loadingCartProducts: false, cartProducts: action.payload };
    case PRODUCT_CART_PRODUCTS_LIST_FAIL:
      return { loadingCartProducts: false, errorCartProducts: action.payload };
    case PRODUCT_CART_PRODUCTS_LIST_QTY_CHANGE:
      return { loadingCartProducts: false, cartProducts: action.payload };
    default:
      return state;
  }
}

function productDetailsReducer(state = { product: {} }, action) {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { loading: true };
    case PRODUCT_DETAILS_SUCCESS:
      return { loading: false, product: action.payload };
    case PRODUCT_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

function productsToCartReducer(state = { products: [] }, action) {
  switch (action.type) {
    case PRODUCT_TO_CART:
      return {
        ...state,
        products: [
          ...state.products.filter(
            (product) => product._id !== action.payload._id
          ),
          action.payload,
        ],
      };
    case PRODUCT_TO_CART_UPDATE_AFTER_SIGN_IN:
      return {
        ...state,
        products: action.payload,
      };
    case PRODUCT_QTY_CHANGE:
      return {
        ...state,
        products: [
          ...state.products.map((product) => {
            if (product._id === action.payload._id) {
              product.qty = action.payload.qty;
            }

            return product;
          }),
        ],
      };
    case PRODUCT_DELETE:
      return {
        ...state,
        products: [
          ...state.products.filter(
            (product) => product._id !== action.payload._id
          ),
        ],
      };
    case CART_CLEAN:
      return {
        ...state,
        products: [],
      };
    default:
      return state;
  }
}

function productCreateReducer(state = { product: {} }, action) {
  switch (action.type) {
    case PRODUCT_CREATION_REQUEST:
      return { loadingCreation: true };
    case PRODUCT_CREATION_SUCCESS:
      return { loading: false, successCreation: true, product: action.payload };
    case PRODUCT_CREATION_FAIL:
      return { loadingCreation: false, errorCreation: action.payload };
    case PRODUCT_CREATION_CLEAN_ERROR:
      return { loadingCreation: false, errorCreation: null };
    default:
      return state;
  }
}

function productDeleteReducer(state = { product: {} }, action) {
  switch (action.type) {
    case PRODUCT_DELETION_REQUEST:
      return { loadingDeletion: true };
    case PRODUCT_DELETION_SUCCESS:
      return { loading: false, successDeletion: true, product: action.payload };
    case PRODUCT_DELETION_FAIL:
      return { loadingDeletion: false, errorDeletion: action.payload };
    default:
      return state;
  }
}

export {
  productListReducer,
  productDetailsReducer,
  productsToCartReducer,
  productCreateReducer,
  productDeleteReducer,
  loadCartProductsReducer,
  sortProductsReducer,
};

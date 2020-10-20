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
  CART_CLEAN
} from "../constants/productConstants";

function productListReducer(state = { products: [] }, action) {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true };
    case PRODUCT_LIST_SUCCESS:
      return { loading: false, products: action.payload };
    case PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload };
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
        products: []
      }
    default:
      return state;
  }
}

export { productListReducer, productDetailsReducer, productsToCartReducer };

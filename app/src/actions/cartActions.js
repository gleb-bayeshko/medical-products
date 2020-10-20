import { PRODUCT_QTY_CHANGE, PRODUCT_DELETE, CART_CLEAN } from "../constants/productConstants";

const productInCartQty = (id, qty) => {
  return {
    type: PRODUCT_QTY_CHANGE,
    payload: {_id: id, qty: qty}
  }
}

const productDelete = (id) => {
  return {
    type: PRODUCT_DELETE,
    payload: {_id: id}
  }
}

const cleanCart = () => {
  return {
    type: CART_CLEAN,
  }
}

export { productInCartQty, productDelete, cleanCart };

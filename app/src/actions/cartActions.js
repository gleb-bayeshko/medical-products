import { PRODUCT_QTY_CHANGE } from "../constants/productConstants";

const productInCartQty = (id, qty) => {
  return {
    type: PRODUCT_QTY_CHANGE,
    payload: {_id: id, qty: qty}
  }
}

export { productInCartQty };

import { ADD_PRODUCTS } from "./actionTypes";

export function addCheckedProductsAction(products) {
  return {
    type: ADD_PRODUCTS,
    payload: products
  };
}

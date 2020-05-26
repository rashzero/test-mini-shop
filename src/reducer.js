import { ADD_PRODUCTS } from "./actionTypes";

const initialState = {
  checkedProducts: []
};

function addReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_PRODUCTS:
      return {
        ...state,
        checkedProducts: action.payload
      };
    default:
      return state;
  }
}

export default addReducer;

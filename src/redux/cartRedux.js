// import Axios from 'axios';
// import { API_URL } from '../config';

/* selectors */
export const getAll = ({ cart }) => cart.products;
export const getCount = ({ cart }) => cart.products.length;

/* action name creator */
const reducerName = `cart`;
const createActionName = (name) => `app/${reducerName}/${name}`;

/* action types */
const ADD_PRODUCT = createActionName(`ADD_PRODUCT`);
const REMOVE_PRODUCT = createActionName(`REMOVE_PRODUCT`);

/* action creators */
export const addProductToCart = (payload) => ({ payload, type: ADD_PRODUCT });
export const removeProductFromCart = (payload) => ({
  payload,
  type: REMOVE_PRODUCT,
});

/* reducer */
export default function reducer(statePart = [], action = {}) {
  switch (action.type) {
    case ADD_PRODUCT: {
      return {
        ...statePart,
        products: [...statePart.products, action.payload],
      };
    }
    case REMOVE_PRODUCT: {
      console.log(action.payload);
      return {
        ...statePart,
        products: statePart.products.filter((i) => i.id !== action.payload.id),
        // products: [...statePart.products.slice(0, action.payload)],
      };
    }
    default:
      return statePart;
  }
}

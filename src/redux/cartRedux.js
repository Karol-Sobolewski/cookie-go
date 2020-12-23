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
const ADD_QTY = createActionName(`ADD_QTY`);
const SUBTRACT_QTY = createActionName(`SUBTRACT_QTY`);
const REMOVE_PRODUCT = createActionName(`REMOVE_PRODUCT`);
const UPDATE_PRICE = createActionName(`UPDATE_PRICE`);

/* action creators */
export const addProductToCart = (payload) => ({ payload, type: ADD_PRODUCT });
export const removeProductFromCart = (payload) => ({
  payload,
  type: REMOVE_PRODUCT,
});
export const addProductQty = (payload) => ({ payload, type: ADD_QTY });
export const subtractProductQty = (payload) => ({
  payload,
  type: SUBTRACT_QTY,
});
export const updatePrice = (payload) => ({ ...payload, type: UPDATE_PRICE });

/* reducer */

export default function reducer(statePart = [], action = {}) {
  switch (action.type) {
    case ADD_PRODUCT: {
      const existingCartItem = statePart.products.find(
        (item) => item.id === action.payload.id
      );
      if (existingCartItem) {
        return {
          ...statePart,
          products: statePart.products.map((product) => {
            if (product.id === action.payload.id) {
              return {
                ...product,
                qty: product.qty + action.payload.qty,
                price: product.price + action.payload.price,
              };
            }
            return product;
          }),
        };
      }
      return {
        ...statePart,
        products: [...statePart.products, action.payload],
      };
    }
    case REMOVE_PRODUCT: {
      return {
        ...statePart,
        products: statePart.products.filter((i) => i.id !== action.payload.id),
      };
    }
    case ADD_QTY: {
      return {
        ...statePart,
        products: statePart.products.map((product) => {
          if (product.id === action.payload.id) {
            // console.log(product);
            // console.log(action.payload);
            return {
              ...product,
              qty: product.qty + 1,
              price: product.qty * product.singlePrice,
            };
          }
          return product;
        }),
      };
    }
    case SUBTRACT_QTY: {
      return {
        ...statePart,
        products: statePart.products.map((product) => {
          if (product.id === action.payload.id && product.qty > 1) {
            // console.log(product);
            // console.log(action.payload);
            return {
              ...product,
              qty: product.qty - 1,
              price: product.qty * product.singlePrice,
            };
          }
          return product;
        }),
      };
    }
    case UPDATE_PRICE: {
      return {
        ...statePart,
        products: statePart.products.map((product) => {
          if (product.id === action.payload.id && product.qty > 1) {
            // console.log(product);
            // console.log(action.payload);
            return {
              ...product,
              price: action.payload,
              // price: product.qty * product.singlePrice,
            };
          }
          return product;
        }),
      };
    }
    default:
      return statePart;
  }
}

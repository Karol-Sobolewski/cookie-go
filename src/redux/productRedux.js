import Axios from 'axios';
import { useSelector } from 'react-redux';
import { API_URL } from '../config';

/* Selectors */

// export const getProductById = ({ product }, productId) => {
//   console.log(productId);
//   console.log(product);
//   return product.data;
// };

const reducerName = `products`;
const createActionName = (name) => `app/${reducerName}/${name}`;

const FETCH_START = createActionName(`FETCH_START`);
const FETCH_SUCCESS = createActionName(`FETCH_SUCCESS`);
const FETCH_ERROR = createActionName(`FETCH_ERROR`);

export const fetchStarted = (payload) => ({ payload, type: FETCH_START });
export const fetchSuccess = (payload) => ({ payload, type: FETCH_SUCCESS });
export const fetchError = (payload) => ({ payload, type: FETCH_ERROR });

// export const getMenuItems = ({ menus }) => menus.data;

export const fetchProducts = () => (dispatch) => {
  dispatch(fetchStarted());

  Axios.get(`${API_URL}/products`)
    .then((res) => {
      dispatch(fetchSuccess(res.data));
      // console.log(`res`, res.data);
    })
    .catch((err) => {
      dispatch(fetchError(err.message || true));
    });
};

export const fetchSelectedProduct = (id) => async (dispatch) => {
  console.log(`id`, id);
  dispatch(fetchStarted());

  try {
    const res = await Axios.get(`${API_URL}/products/${id}`);
    await new Promise((resolve, reject) => resolve());
    console.log(`res`, res);
    dispatch(fetchSuccess(res.data));
  } catch (err) {
    dispatch(fetchError(err.message || true));
  }
};

export default function reducer(statePart = [], action = {}) {
  switch (action.type) {
    case FETCH_START: {
      return {
        ...statePart,
        loading: {
          active: true,
          error: false,
        },
      };
    }
    case FETCH_SUCCESS: {
      // console.log(`menu`, action.payload);
      return {
        ...statePart,
        loading: {
          active: false,
          error: false,
        },
        data: action.payload,
      };
    }
    case FETCH_ERROR: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: action.payload,
        },
      };
    }
    default:
      return statePart;
  }
}

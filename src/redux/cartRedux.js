/* selectors */
export const getAll = ({ cart }) => cart.products;
export const getCount = ({ cart }) => cart.products.length;

/* action name creator */
const reducerName = `cart`;
const createActionName = (name) => `app/${reducerName}/${name}`;

/* action types */
const FETCH_START = createActionName(`FETCH_START`);
const FETCH_ERROR = createActionName(`FETCH_ERROR`);

const ADD_PRODUCT = createActionName(`ADD_PRODUCT`);
const ADD_QTY = createActionName(`ADD_QTY`);
const SUBTRACT_QTY = createActionName(`SUBTRACT_QTY`);
const REMOVE_PRODUCT = createActionName(`REMOVE_PRODUCT`);
const CLEAN_CART = createActionName(`CLEAN_CART`);
const UPDATE_CART_FROM_LOCAL_STORAGE = createActionName(
  `UPDATE_CART_FROM_LOCALSTORAGE`
);

/* action creators */
export const fetchStarted = (payload) => ({ payload, type: FETCH_START });
export const fetchError = (payload) => ({ payload, type: FETCH_ERROR });
export const fetchCartDataFromLocalStorage = (payload) => ({
  payload,
  type: UPDATE_CART_FROM_LOCAL_STORAGE,
});

export const saveCartToLocalStorage = (state) => () => {
  try {
    const serialisedState = JSON.stringify(state);
    localStorage.setItem(`cartData`, serialisedState);
  } catch (err) {
    console.warn(err);
  }
};

export const loadCartFromLocalStorage = () => (dispatch, getState) => {
  try {
    const serialisedState = JSON.parse(localStorage.getItem(`cartData`));
    if (serialisedState !== null)
      dispatch(fetchCartDataFromLocalStorage(serialisedState));
  } catch (err) {
    console.warn(err);
  }
};

export const addProductToCart = (payload) => ({ payload, type: ADD_PRODUCT });

export const addProductQty = (payload) => ({ payload, type: ADD_QTY });

export const subtractProductQty = (payload) => ({
  payload,
  type: SUBTRACT_QTY,
});

export const removeProductFromCart = (payload) => ({
  payload,
  type: REMOVE_PRODUCT,
});

export const cleanCart = () => ({
  type: CLEAN_CART,
});

/* reducer */
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
    case FETCH_ERROR: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: action.payload,
        },
      };
    }
    case UPDATE_CART_FROM_LOCAL_STORAGE:
      return {
        ...statePart,
        products: action.payload,
      };

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
            return { ...product };
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
    case CLEAN_CART: {
      return {
        ...statePart,
        products: [],
      };
    }
    case ADD_QTY: {
      return {
        ...statePart,
        products: statePart.products.map((product) => {
          if (product.id === action.payload.id) {
            return {
              ...product,
              qty: action.payload.qty,
              price: action.payload.qty * product.singlePrice,
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
            return {
              ...product,
              qty: action.payload.qty,
              price: action.payload.qty * product.singlePrice,
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

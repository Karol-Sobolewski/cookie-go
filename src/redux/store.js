import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import initialState from './initialState';
import menuReducer from './menuRedux';
import pagesReducer from './pageRedux';
import productsReducer from './productRedux';
import cartReducer from './cartRedux';
import utilsReducer from './utilsRedux';
import orderReducer from './orderRedux';

// define initial state and shallow-merge initial data

// define reducers
const reducers = {
  menus: menuReducer,
  pages: pagesReducer,
  products: productsReducer,
  cart: cartReducer,
  utils: utilsReducer,
  orders: orderReducer,
};

// add blank reducers for initial state properties without reducers
Object.keys(initialState).forEach((item) => {
  if (item) {
    if (typeof reducers[item] === `undefined`) {
      reducers[item] = (statePart = null) => statePart;
    }
  }
});

const combinedReducers = combineReducers(reducers);

// create store
const store = createStore(
  combinedReducers,
  initialState,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;

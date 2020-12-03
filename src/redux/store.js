import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import initialState from './initialState';
import menuReducer from './menuRedux';
// define initial state and shallow-merge initial data

// define reducers
const reducers = {
  menus: menuReducer,
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

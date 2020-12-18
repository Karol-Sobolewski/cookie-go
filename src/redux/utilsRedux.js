import Axios from 'axios';
import { API_URL } from '../config';

const reducerName = `utils`;
const createActionName = (name) => `app/${reducerName}/${name}`;

const FETCH_START = createActionName(`FETCH_START`);
const FETCH_SUCCESS = createActionName(`FETCH_SUCCESS`);
const FETCH_ERROR = createActionName(`FETCH_ERROR`);
const CHANGE_LNG = createActionName(`CHANGE_LNG`);
const CHANGE_RATE = createActionName(`CHANGE_RATE`);

export const fetchStarted = (payload) => ({ payload, type: FETCH_START });
export const fetchSuccess = (payload) => ({ payload, type: FETCH_SUCCESS });
export const fetchError = (payload) => ({ payload, type: FETCH_ERROR });
export const changeActiveLanguage = (payload) => ({
  payload,
  type: CHANGE_LNG,
});
export const changeExchangeRate = (payload) => ({
  payload,
  type: CHANGE_RATE,
});

// export const getMenuItems = ({ menus }) => menus.data;

export const fetchUtils = () => (dispatch) => {
  dispatch(fetchStarted());

  Axios.get(`${API_URL}/utils`)
    .then((res) => {
      dispatch(fetchSuccess(res.data));
      console.log(`utils`, res.data);
    })
    .catch((err) => {
      dispatch(fetchError(err.message || true));
    });
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
      console.log(`utils`, action.payload);
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
    case CHANGE_LNG: {
      return {
        ...statePart,
        data: {
          ...statePart.data,
          activeLanguage: action.payload,
        },
      };
    }
    case CHANGE_RATE: {
      return {
        ...statePart,
        data: {
          ...statePart.data,
          rate: action.payload,
        },
      };
    }
    default:
      return statePart;
  }
}

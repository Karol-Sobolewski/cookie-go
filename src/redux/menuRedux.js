import Axios from 'axios';
import { API_URL } from '../config';

const reducerName = `menus`;
const createActionName = (name) => `app/${reducerName}/${name}`;

const FETCH_START = createActionName(`FETCH_START`);
const FETCH_SUCCESS = createActionName(`FETCH_SUCCESS`);
const FETCH_ERROR = createActionName(`FETCH_ERROR`);
const CHANGE_LANG = createActionName(`CHANGE_LANG`);

export const fetchStarted = (payload) => ({ payload, type: FETCH_START });
export const fetchSuccess = (payload) => ({ payload, type: FETCH_SUCCESS });
export const fetchError = (payload) => ({ payload, type: FETCH_ERROR });
export const changeLanguage = (payload) => ({ payload, type: CHANGE_LANG });

// export const getMenuItems = ({ menus }) => menus.data;

export const fetchMenu = () => (dispatch) => {
  dispatch(fetchStarted());

  Axios.get(`${API_URL}/menus`)
    .then((res) => {
      dispatch(fetchSuccess(res.data));
      console.log(`res`, res.data);
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
      console.log(`menu`, action.payload);
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
    case CHANGE_LANG: {
      return {
        ...statePart,
        data: {
          ...statePart.data,
          activeLanguage: action.payload,
        },
      };
    }
    default:
      return statePart;
  }
}

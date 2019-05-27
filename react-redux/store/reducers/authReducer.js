import {
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
} from '../actions/actionTypes';

const initialState = {
  id: null,
  user: null,
  errors: null,
};

export const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOGIN_FAIL:
      return {
        ...state,
        id: null,
        user: null,
        errors: Object.values(payload),
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        id: payload.user.id,
        user: payload.user,
        errors: null,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        id: null,
        user: null,
        errors: null,
      };
    case LOGOUT_FAIL:
      return {
        ...state,
        id: null,
        user: null,
        errors: payload.errors,
      };
    default:
      return state;
  }
};

import { SET_THEME } from '../actions/actionTypes';

const initialState = {
  settings: null,
  error: null,
  theme: false,
};

export const settingReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_THEME:
      return {
        ...state,
        theme: payload,
      };
    default:
      return state;
  }
};

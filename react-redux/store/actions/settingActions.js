import { GET_THEME, SET_THEME, THEME } from './actionTypes';
import _isEmpty from 'lodash/isEmpty';

const removeTheme = theme => {
  document.head.removeChild(theme);
};

const addTheme = theme => {
  const link = document.createElement('link');
  link.setAttribute('rel', 'stylesheet');
  link.setAttribute('id', 'theme');
  link.setAttribute('href', '/css/theme.css');
  document.head.appendChild(link);
};

export const toggleTheme = () => {
  return (dispatch, getState) => {
    const curTheme = document.querySelector(`#${THEME}`);

    if (curTheme) {
      removeTheme(curTheme);
      localStorage.setItem(THEME, true);
    } else {
      addTheme();
      localStorage.removeItem(THEME);
    }
    const theme = !!localStorage.getItem(THEME);
    dispatch({ type: SET_THEME, payload: theme });
  };
};

export const setTheme = () => {
  return (dispatch, getState) => {
    const theme = localStorage.getItem(THEME);
    if (theme) {
      const curTheme = document.querySelector(`#${THEME}`);
      removeTheme(curTheme);
      dispatch({ type: SET_THEME, payload: theme });
    }
  };
};

import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
} from './actionTypes';

/**
 * Login action
 * @param {*} credentials
 */
export const login = credentials => {
  return (dispatch, getState) => {
    const user = JSON.parse(localStorage.getItem('user'));

    // if no user in localStorage, then it is a login request
    if (!user && credentials) {
      axios
        .post('login', credentials)
        .then(response => {
          const payload = response.data;
          localStorage.setItem('user', JSON.stringify(payload));
          dispatch({ type: LOGIN_SUCCESS, payload });
        })
        .catch(error => {
          dispatch({ type: LOGIN_FAIL, payload: error.response.data });
        });
    }

    // Perform autologin with a user in localStorage
    if (user) {
      dispatch({ type: LOGIN_SUCCESS, payload: user });
    } else {
      dispatch({ type: LOGIN_FAIL, payload: [] });
    }
  };
};

/**
 * Logout action
 */
export const logout = () => {
  return (dispatch, getState) => {
    axios
      .post('logout')
      .then(() => {
        localStorage.removeItem('user');
        dispatch({ type: LOGOUT_SUCCESS });
      })
      .catch(errors => {
        console.group('LOGOUT_FAIL');
        console.info('Logout error', errors);
        console.groupEnd();
        dispatch({ type: LOGOUT_FAIL, payload: { errors } });
      });
  };
};

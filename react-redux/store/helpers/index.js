import { LOGIN_FAIL } from '../actions/actionTypes';

/**
 * Handle error
 */
export const handleError = (error, cb) => {
    if(error.response){
        // If is not authenticated
        if(401 == error.response.status) {
            localStorage.removeItem('user');
            cb({ type: LOGIN_FAIL, payload: error.response.data });
        }

    } else {
        console.error('Error: ', error.message);
    }
};

/**
 * Check if is array
 * @param {*} param 
 */
export const isArray = param => {
    return Array.isArray(param);
};


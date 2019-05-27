import { GET_STATS } from "./actionTypes";
import { handleError } from '../helpers';

/**
 * Get Stats action
 */
export const getStats = () => {
    return (dispatch, getState) => {
        return axios
            .post('/api/stats')
            .then(response => {
                dispatch({type: GET_STATS, stats: response.data});
            })
            .catch(error => {
                handleError(error, dispatch);
            });
    }
};

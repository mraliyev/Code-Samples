import { GET_STATS } from "../actions/actionTypes";

const initialState = {
    stats: []
};

export const statReducer = (state = initialState, { type, stats }) => {
    switch (type) {
        case GET_STATS:
            return {
                ...state,
                stats
            };
        default:
            return state;
    }
}
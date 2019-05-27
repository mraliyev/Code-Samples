import {
  OPEN_TICKETS,
  OWN_TICKETS,
  IN_PROGRESS_TICKETS,
  GET_TICKETS_COUNT,
} from './actionTypes';
import { handleError } from '../helpers';

/**
 * Open Tickets action
 */
export const getOpenTickets = () => {
  return (dispatch, getState) => {
    return axios
      .get('tickets/open')
      .then(response => {
        dispatch({ type: OPEN_TICKETS, tickets: response.data.tickets });
      })
      .then(dispatch(getInProgressTickets()))
      .catch(error => {
        handleError(error, dispatch);
      });
  };
};

/**
 * InProgress Tickets action
 */
export const getInProgressTickets = () => {
  return (dispatch, getState) => {
    return axios
      .get('tickets/inprogress')
      .then(response => {
        dispatch({ type: IN_PROGRESS_TICKETS, tickets: response.data });
      })
      .catch(error => {
        handleError(error, dispatch);
      });
  };
};

/**
 * Own Tickets action
 */
export const getOwnTickets = () => {
  return (dispatch, getState) => {
    const { auth } = getState();
    return axios
      .post('tickets/own', { owner: auth.user.username })
      .then(response => {
        dispatch({ type: OWN_TICKETS, tickets: response.data.tickets });
      })
      .catch(error => {
        handleError(error, dispatch);
      });
  };
};


/**
 * Get tickets count
 */
export const getTicketsCount = () => {
  return (dispatch, getState) => {
    dispatch({ type: GET_TICKETS_COUNT });
  };
};

/**
 * Run popover
 */
export const runPopover = () => {
  return () => {
    $('[data-toggle="popover"]').popover();
  };
};

import {
  OPEN_TICKETS,
  OWN_TICKETS,
  IN_PROGRESS_TICKETS,
  GET_TICKETS_COUNT,
} from '../actions/actionTypes';
import isEmpty from 'lodash/isEmpty';

const initState = {
  isLoading: true,
  openTickets: [],
  inProgressTickets: [],
  ownTickets: [],
  count: 0,
};

export const ticketReducer = (state = initState, { tickets, type }) => {
  switch (type) {
    case OPEN_TICKETS:
      return {
        ...state,
        isLoading: false,
        openTickets: tickets,
      };
    case IN_PROGRESS_TICKETS:
      return {
        ...state,
        isLoading: false,
        inProgressTickets: tickets,
      };
    case OWN_TICKETS:
      return {
        ...state,
        isLoading: false,
        ownTickets: tickets,
      };
    default:
      return state;
  }
};

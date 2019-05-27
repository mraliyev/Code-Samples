import React from 'react';
import { TicketRow } from './TicketRow';
import _isArray from 'lodash/isArray';
import _isEmpty from 'lodash/isEmpty';

export const TicketsList = ({ tickets, ticketsType }) => {
  return (
    <table id="own-tickets" className="tickets w3-table-all w3-white w3-card">
      <tbody>
        {!_isEmpty(tickets) && _isArray(tickets)
          ? tickets.map(ticket => {
              const rowColor =
                ticket.state && `w3-text-black w3-${ticket.state.age}`;
              const link = `${ticket.url}`;
              return (
                <TicketRow
                  key={ticket.id}
                  rowColor={rowColor}
                  link={link}
                  ticket={ticket}
                />
              );
            })
          : null}
      </tbody>
    </table>
  );
};

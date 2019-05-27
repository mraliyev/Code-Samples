import React from 'react';
import _isArray from 'lodash/isArray';
import _isEmpty from 'lodash/isEmpty';
import { TicketRow } from './TicketRow';

const makeTable = (tickets, type) => {
  if (_isArray(tickets) && !_isEmpty(tickets)) {
    return (
      <table className="tickets w3-table-all w3-card w3-margin-bottom">
        <tbody>
          <tr className="w3-light-grey subheading" key={type}>
            <th colSpan="7" className="w3-center w3-padding">
              {type} Tickets
            </th>
          </tr>
          {makeTableBody(tickets, type)}
        </tbody>
      </table>
    );
  }
};

const makeTableBody = (tickets, type) => {
  const body = [];
  if (_isArray(tickets) && !_isEmpty(tickets)) {
    body.push(
      tickets.map(ticket => {
        return (
          <TicketRow
            key={`${type}-${ticket.id}`}
            rowColor={rowColor}
            link={link}
            ticket={ticket}
          />
        );
      })
    );
  }
  return body;
};

const filterMyTickets = (user, tickets) => {
  return (
    _isArray(tickets) &&
    tickets.filter(ticket => {
      try {
        return ticket.owner.username == (user ? user.username : []);
      } catch (error) {
        console.error(error);
      }
    })
  );
};

const filterAbuseTickets = (tickets, flag = true) => {
    if(flag){
      return openTickets.filter(
        ticket => ticket.department.name.toLowerCase() == 'abuse'
      );
    } else {
      return openTickets.filter(
        ticket => ticket.department.name.toLowerCase() !== 'abuse'
      );
    }
}

export const CombinedTicketsList = ({
  auth,
  openTickets,
  inProgressTickets,
}) => {
  const myOpenTickets = filterMyTickets(auth.user, openTickets);
  const myInProgressTickets = filterMyTickets(auth.user, inProgressTickets);

  // Remove Abuse tickets from primary/open tickets view
  const openTicketsWithoutAbuse = filterAbuseTickets(openTickets, false); 

  // Abuse tickets
  const abuseTickets = filterAbuseTickets(openTickets); 

  // Combined tickets for 'My Tickets' section
  const myTickets = [...myOpenTickets, ...myInProgressTickets];

  return (
    <div>
      {makeTable(myTickets, 'My')}
      {makeTable(openTicketsWithoutAbuse, 'Open')}
      {makeTable(inProgressTickets, 'In Progress')}
      {makeTable(abuseTickets, 'Abuse')}
    </div>
  );
};

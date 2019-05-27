import {connect} from 'react-redux';
import {withTickets} from './withTickets';
import {CombinedTicketsList} from './CombinedTicketsList';
import {getOpenTickets as getTickets, runPopover} from '../../store/actions';

const OpenTickets = withTickets(CombinedTicketsList);

const mapStateToProps = (state) => ({
    auth: state.auth, 
    openTickets: state.tickets.openTickets,
    inProgressTickets: state.tickets.inProgressTickets,
    ticketsType: 'open'
});

export default connect(mapStateToProps, {getTickets, runPopover})(OpenTickets);

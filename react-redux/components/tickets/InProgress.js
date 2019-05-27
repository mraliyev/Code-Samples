import {connect} from 'react-redux';
import {withTickets} from './withTickets';
import {TicketsList} from './TicketsList';
import {getInProgressTickets as getTickets, runPopover} from '../../store/actions';

const InProgress = withTickets(TicketsList);

const mapStateToProps = (state) => ({
    auth: state.auth, 
    tickets: state.tickets.inProgressTickets, 
    ticketsType: 'inProgress'
});

export default connect(mapStateToProps, {getTickets, runPopover})(InProgress);

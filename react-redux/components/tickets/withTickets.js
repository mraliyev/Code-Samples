import React from 'react';

export const TicketHOC = (WrappedComponent, state, actions) => {

    return class TicketHOC extends React.Component {
        constructor(props) {
            super(props);
            this.timer = null;
            this.timeout = 60 * 1000; // 1 min
        }

        componentDidMount = () => {
            this
                .props
                .getTickets();
            this
                .props
                .runPopover();
            this.timer = setInterval(this.props.getTickets, this.timeout);
        }

        componentDidUpdate = (prevProps, prevState) => {
            this
                .props
                .runPopover();
        }

        componentWillUnmount = () => {
            clearInterval(this.timer);
        }

        render() {
            return (
                <div className="w3-reponsive wrapper">
                    <WrappedComponent {...this.props}/>
                </div>
            )
        }
    }
};

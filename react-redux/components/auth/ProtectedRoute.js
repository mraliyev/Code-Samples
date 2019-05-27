import React from 'react';
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({component: Component, ...rest}) => {
  const { auth } = {...rest};
  
  return (
    <Route {...rest} 
        render={ props => {
            return(
                auth.id
                ?   <Component /> 
                :   <Redirect to={{
                        pathname: '/login',
                        state: {referrer: props.location}
                    }} />
            )
        }} 
    />
  )
}

const mapStateToProps = (state) => ({
    auth: state.auth 
})

export default connect(mapStateToProps)(ProtectedRoute);

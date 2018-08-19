import React, {Component} from "react";
import {Route, Redirect} from "react-router-dom";
import authenticationService from '../../services/authenticationService';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            authenticationService.isHaveSessionCookie() ? (
                <Component {...props} />
            ) : (
                <Redirect
                    to={{
                        pathname: "/",
                        state: { from: props.location }
                    }}
                />
            )
        }
    />
);

export default PrivateRoute;
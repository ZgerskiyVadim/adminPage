import React, {Component} from "react";
import {
    Route,
    Redirect,
} from "react-router-dom";
import AuthenticationService from '../../services/authenticationService';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            AuthenticationService.isHaveSessionCookie() ? (
                <Component {...props} />
            ) : (
                <Redirect
                    to={{
                        pathname: "/login",
                        state: { from: props.location }
                    }}
                />
            )
        }
    />
);

export default PrivateRoute;
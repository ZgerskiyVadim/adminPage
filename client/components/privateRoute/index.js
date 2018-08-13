import React, {Component} from "react";
import {
    Route,
    Redirect,
} from "react-router-dom";
import AuthenticationService from '../../services/authenticationService';

export default ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            AuthenticationService.isAuthenticated() ? (
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
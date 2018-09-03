import React from "react";
import {Route, Redirect} from "react-router-dom";
import authenticationService from '../../services/authenticationService';

const LoggedRedirectOnUsers = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            authenticationService.isHaveSession() ? (
                <Redirect
                    to={{
                        pathname: "/users",
                        state: { from: props.location }
                    }}
                />
            ) : (
                <Component {...props} />
            )
        }
    />
);

export default LoggedRedirectOnUsers;
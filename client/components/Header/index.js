import React, {PureComponent} from 'react';
import {Link} from 'react-router-dom';
import {connect} from "react-redux";
import { withRouter } from 'react-router';

import './index.scss';
import classNames from 'classnames';
import AuthenticationService from '../../services/authenticationService';

class Header extends PureComponent {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
    }

    logout() {
        AuthenticationService.logout();
    }

    render() {
        const isAuthenticated = AuthenticationService.isHaveSessionCookie();

        return (
            <div>
                <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
                    <Link to='/login' className={classNames("navbar-brand", {'header--hide': isAuthenticated})}>Login</Link>
                    <span onClick={this.logout} className={classNames("navbar-brand", {'header--hide': !isAuthenticated})}>Logout</span>
                </nav>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    state
});

export default withRouter(connect(mapStateToProps, null)(Header));
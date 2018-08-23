import React, {PureComponent} from 'react';
import {Link} from 'react-router-dom';
import {connect} from "react-redux";
import { withRouter } from 'react-router';
import Links from '../Links';

import './index.scss';
import classNames from 'classnames';
import authenticationService from '../../services/authenticationService';

export class Header extends PureComponent {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
    }

    logout() {
        authenticationService.logout();
    }

    render() {
        const isAuthenticated = authenticationService.isHaveSession();

        return (
            <div>
                <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
                    <Links isAuthenticated={isAuthenticated}/>
                    <Link to='/' className={classNames("navbar-brand", {'header--hide': isAuthenticated})}>
                        <i className="fa fa-sign-in" />
                        Login
                    </Link>
                    <span onClick={this.logout} className={classNames("navbar-brand", {'header--hide': !isAuthenticated})}>
                        <i className="fa fa-sign-out" />
                        Logout
                    </span>
                </nav>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    state
});

export default withRouter(connect(mapStateToProps, null)(Header));
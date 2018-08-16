import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './index.scss';
import redirectOnPage from '../../services/redirectOnPage';

class Links extends PureComponent {
    constructor(props) {
        super(props);

        this.goToUsersPage = this.goToUsersPage.bind(this);
        this.goToGroupsPage = this.goToGroupsPage.bind(this);
    }

    goToUsersPage() {
        redirectOnPage.path('/users');
    }

    goToGroupsPage() {
        redirectOnPage.path('/groups');
    }

    render() {
        const {lastBreadCrumb} = this.props;
        const lastPathIsUsers = lastBreadCrumb && (lastBreadCrumb.path === 'users');
        const lastPathIsGroups = lastBreadCrumb && (lastBreadCrumb.path === 'groups');

        return (
            <div className='links--row'>
                <ul className='nav nav-pills'>
                    <li className="link nav-item">
                        <a onClick={this.goToUsersPage} className={classNames("link-users nav-link border border-primary link--margin-right", {'active': lastPathIsUsers})}>Users</a>
                    </li>
                    <li className="link nav-item">
                        <a onClick={this.goToGroupsPage} className={classNames("link-groups nav-link border border-primary", {'active': lastPathIsGroups})}>Groups</a>
                    </li>
                </ul>

            </div>
        )
    }

}

Links.defaultProps = {
    lastBreadCrumb: {}
};

Links.propTypes = {
    lastBreadCrumb: PropTypes.object
};

export default Links;
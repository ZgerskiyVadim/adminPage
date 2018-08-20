import React, {PureComponent} from 'react';
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
        const {isAuthenticated} = this.props;

        return (
            <div className={classNames("links--row", {'links--hide': !isAuthenticated})}>
                <ul className='nav nav-pills'>
                    <li className="link nav-item">
                        <a onClick={this.goToUsersPage} className="link-users nav-link border border-primary link--margin-right active">Users</a>
                    </li>
                    <li className="link nav-item">
                        <a onClick={this.goToGroupsPage} className="link-groups nav-link border border-primary active">Groups</a>
                    </li>
                </ul>
            </div>
        )
    }

}

export default Links;
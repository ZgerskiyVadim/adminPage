import React, { PureComponent } from 'react';
import { withRouter } from 'react-router';
import classNames from 'classnames';
import './index.scss';
import redirectOnPage from '../../services/redirectOnPage';
import {bindActionCreators} from "redux";
import * as usersActionCreators from "../../actions/action_creators/users";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {CreateUserPage} from "../../containers/CreateUserPage";

export class Breadcrumb extends PureComponent {
    constructor(props) {
        super(props);

        this.goToPath = this.goToPath.bind(this);
    }

    locationPath() {
        const locationPath = this.props.location.pathname;

        const locations = this.getLocations(locationPath);

        if (locations.length) {
            const lastPath = locations.length - 1;
            locations[lastPath].islastPath = true;
        }

        return locations;
    }

    getLocations(locationPath) {
        const {username, _id} = this.props.user.data;

        return locationPath.split('/')
            .filter(locationPath => !!locationPath)
            .map(pathName => {
                return {
                    pathName: pathName === _id ? username : pathName,
                    location: locationPath.substr(0, locationPath.indexOf(pathName)) + pathName
                };
            });
    }

    goToPath(breadcrumb) {
        const {location, islastPath} = breadcrumb;

        !islastPath && redirectOnPage.path(location);
    };

    render() {
        return (
            <div>
                <nav className="breadcrumb-root" aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        {
                            this.locationPath().map((breadcrumb, index) => {
                                return (
                                    <li onClick={() => this.goToPath(breadcrumb)}
                                        className={classNames('breadcrumb-item', {'breadcrumb--cursor breadcrumb--blue': !breadcrumb.islastPath, 'active': breadcrumb.islastPath})}
                                        key={index}>
                                        {breadcrumb.pathName}
                                    </li>
                                );
                            })
                        }
                    </ol>
                </nav>
            </div>
        );
    }
}

CreateUserPage.defaultProps = {
    user: {}
};

CreateUserPage.propTypes = {
    user: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    user: state.Users.user
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({
        ...usersActionCreators
    }, dispatch)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Breadcrumb));

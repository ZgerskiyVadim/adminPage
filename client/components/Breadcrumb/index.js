import React, { PureComponent } from 'react';
import { withRouter } from 'react-router';
import classNames from 'classnames';
import './index.scss';
import redirectOnPage from '../../services/redirectOnPage';

class Breadcrumb extends PureComponent {
    constructor(props) {
        super(props);

        this.goToPath = this.goToPath.bind(this)
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
        return locationPath.split('/')
            .filter(locationPath => !!locationPath)
            .map(path => {
                return {
                    path,
                    location: locationPath.substr(0, locationPath.indexOf(path)) + path
                };
            });
    }

    goToPath(location, islastPath) {
        !islastPath && redirectOnPage.path(location);
    };

    render() {
        const isPathHomeActive = classNames({'breadcrumb--blue': this.locationPath().length, 'active': !this.locationPath().length});

        return (
            <nav className="breadcrumb-root" aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li onClick={() => this.goToPath('/')} className={classNames('breadcrumb--cursor breadcrumb-item', isPathHomeActive)}>
                        home
                    </li>
                    {
                        this.locationPath().map((item, index) => {
                            return (
                                <li onClick={() => this.goToPath(item.location, item.islastPath)}
                                    className={classNames('breadcrumb--cursor breadcrumb-item', {'breadcrumb--blue': !item.islastPath, 'active': item.islastPath})}
                                    key={index}>
                                        {item.path}
                                </li>
                            );
                        })
                    }
                </ol>
            </nav>
        );
    }
}
export default withRouter(Breadcrumb);
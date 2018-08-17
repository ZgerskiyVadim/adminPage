import React, { PureComponent } from 'react';
import { withRouter } from 'react-router';
import classNames from 'classnames';
import './index.scss';
import redirectOnPage from '../../services/redirectOnPage';
import Links from '../Links';

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
        return locationPath.split('/')
            .filter(locationPath => !!locationPath)
            .map(path => {
                return {
                    path,
                    location: locationPath.substr(0, locationPath.indexOf(path)) + path
                };
            });
    }

    goToPath(breadcrumb) {
        const {location, islastPath} = breadcrumb;
        !islastPath && redirectOnPage.path(location);
    };

    render() {
        const countOfBreadcrumbs = this.locationPath().length;
        const lastBreadCrumb = this.locationPath()[countOfBreadcrumbs - 1];

        return (
            <div>
                <nav className="breadcrumb-root" aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        {
                            this.locationPath().map((breadcrumb, index) => {
                                return (
                                    <li onClick={() => this.goToPath(breadcrumb)}
                                        className={classNames('breadcrumb--cursor breadcrumb-item', {'breadcrumb--blue': !breadcrumb.islastPath, 'active': breadcrumb.islastPath})}
                                        key={index}>
                                        {breadcrumb.path}
                                    </li>
                                );
                            })
                        }
                    </ol>
                </nav>
                <Links lastBreadCrumb={lastBreadCrumb}/>
            </div>
        );
    }
}
export default withRouter(Breadcrumb);

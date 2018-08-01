import React, { Component } from 'react';
import { withRouter } from 'react-router';
import classNames from 'classnames';
import './index.scss';

class Breadcrumb extends Component {

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

    goToPath = (location) => (e) => {
        this.props.history.push(location);
    };

    render() {
        const showPath = classNames({'breadcrumb--hide': !this.locationPath().length});

        return (
            <div className='breadcrumb-root breadcrumb--inline-flex'>
                <h1 className={showPath}>Path:&nbsp;</h1>
                {
                    this.locationPath().map((item, index) => {
                        return (
                            <div className='breadcrumb--inline-flex' key={index}>
                                <h1 onClick={!item.islastPath ? this.goToPath(item.location) : null} className='breadcrumb--cursor'>{item.path}</h1>
                                <h1 className={classNames('breadcrumb--nowrap', {'breadcrumb--hide': item.islastPath})}>&nbsp;- >&nbsp;</h1>
                            </div>
                        );
                    })
                }
            </div>
        );
    }
}
export default withRouter(Breadcrumb);

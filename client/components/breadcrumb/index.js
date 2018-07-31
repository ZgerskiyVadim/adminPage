import React, { Component } from 'react';
import { withRouter } from 'react-router';
import classNames from 'classnames';
import './index.scss';

class Breadcrumb extends Component {

    locationPath() {
        const locationPath = this.props.location.pathname;

        const locations = locationPath.split('/')
            .filter(locationPath => !!locationPath)
            .map(path => {
                return {
                    path,
                    location: locationPath.substr(0, locationPath.indexOf(path)) + path
                };
            });
        if (locations.length) {
            const lastElem = locations.length - 1;
            locations[lastElem].isLastElem = true;
        }
        return locations;
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
                                <h1 onClick={!item.isLastElem ? this.goToPath(item.location) : null} className='breadcrumb--cursor'>{item.path}</h1>
                                <h1 className={classNames('breadcrumb--nowrap', {'breadcrumb--hide': item.isLastElem})}>&nbsp;- >&nbsp;</h1>
                            </div>
                        );
                    })
                }
            </div>
        );
    }
}
export default withRouter(Breadcrumb);

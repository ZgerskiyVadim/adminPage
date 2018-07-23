import React, { Component } from 'react';
import { withRouter } from 'react-router';
import './index.scss';

class Breadcrumb extends Component {
    constructor(props) {
        super(props);
    }

    locationPath() {
        const locationPath = this.props.location.pathname;

        const locations = locationPath.split('/')
            .filter(locationPath => !!locationPath)
            .map(path => {
                return {
                    path,
                    location:  locationPath.substr(0, locationPath.indexOf(path)) + path
                }
            });
        if (locations.length) {
            const lastElem = locations.length - 1;
            locations[lastElem].isLastElem = true;
        }
        return locations;
    }

    goToPath(location) {
        this.props.history.push(location);
    }

    render() {
        const showPath = {display: this.locationPath().length ? 'block' : 'none'};

        return (
            <div className='breadcrumb-root breadcrumb--flex'>
                <h1 style={showPath}>Path:&nbsp;</h1>
                {
                    this.locationPath().map((item, index) => {
                        return (
                            <div className='breadcrumb--flex' key={index}>
                                <h1 onClick={this.goToPath.bind(this, item.location)} className='breadcrumb--cursor'>{item.path}</h1>
                                <h1 style={{display: item.isLastElem ? 'none' : 'block'}}>&nbsp;- >&nbsp;</h1>
                            </div>
                        )
                    })
                }
            </div>
        );
    }
}
export default withRouter(Breadcrumb);
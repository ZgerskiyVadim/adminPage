import React, { Component } from 'react';
import { withRouter } from 'react-router';
import './index.scss';

class Breadcrumb extends Component {
    constructor(props) {
        super(props);
    }

    locationPath() {
        let locationPath = this.props.location.pathname;
        const homePath = 1;
        if (locationPath.length === homePath) {
            return [{
                path: '',
                location: '',
                isLastElem: true
            }]
        } else {
            const locations = this.props.location.pathname.split('/')
                .filter(locationPath => !!locationPath)
                .map(path => {
                return {
                    path,
                    location:  locationPath.substr(0, locationPath.indexOf(path)) + path
                }
            });
            const lastElem = locations.length - 1;
            locations[lastElem].isLastElem = true;
            return locations;
        }
    }

    goToPath(location) {
        this.props.history.push(location);
    }

    render() {
        return (
            <div className='breadcrumb--flex'>
                {
                    this.locationPath().map((item, index) => {
                        return (
                            <div className='breadcrumb--flex' key={index}>
                                <h1 onClick={this.goToPath.bind(this, item.location)} className='breadcrumb--cursor'>{item.path}</h1>
                                <h1 style={{display: item.isLastElem ? 'none' : 'block'}}> - > </h1>
                            </div>
                        )
                    })
                }
            </div>
        );
    }
}
export default withRouter(Breadcrumb);
import React, { Component } from 'react';
import { withRouter } from 'react-router';

class Breadcrumb extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h1>{this.props.location.pathname}</h1>
            </div>
        );
    }
}
export default withRouter(Breadcrumb);
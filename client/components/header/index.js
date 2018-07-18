import React, { Component } from 'react';
import { withRouter } from 'react-router';

class Header extends Component {
    constructor(props) {
        super(props);
    }

    goHome() {
        this.props.history.push('/');
    }

    render() {
        return (
            <div style={{cursor: 'pointer'}}>
                <h1 onClick={this.goHome.bind(this)}>Home</h1>
            </div>
        );
    }
}

export default withRouter(Header);
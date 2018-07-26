import React, {Component} from 'react';
import {withRouter} from 'react-router';
import './index.scss';

class Header extends Component {
    constructor(props) {
        super(props);
        this.goHome = this.goHome.bind(this);
    }

    goHome() {
        this.props.history.push('/');
    }

    render() {
        return (
            <div className='header'>
                <h1 onClick={this.goHome}>Home</h1>
            </div>
        );
    }
}

export default withRouter(Header);

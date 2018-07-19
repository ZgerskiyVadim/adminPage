import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './index.scss';

export default class Home extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='home'>
                <Link to='/users'><h2 className='home--margin-right'>Users</h2></Link>
                <Link to='/groups'><h2>Groups</h2></Link>
            </div>
        );
    }
}
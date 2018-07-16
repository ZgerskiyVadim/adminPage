import React, { Component } from 'react';
import { Link } from "react-router-dom";

export default class Home extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <li><Link to='/users'>Users</Link></li>
                <li><Link to='/groups'>Groups</Link></li>
            </div>
        );
    }
}
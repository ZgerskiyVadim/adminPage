import React, { Component } from 'react';
import { connect } from 'react-redux';

class User extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        console.log('props', this.props);
    }

    render() {
        return (
            <div>
               <h1>USER</h1>
            </div>
        );
    }
}

export default connect()(User);
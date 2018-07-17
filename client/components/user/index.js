import React, { Component } from 'react';
import { connect } from 'react-redux';

class User extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        const id = this.props.match.params.id;
        console.log('id', id);
        this.props.getUser(id)
    }

    render() {
        return (
            <div>
               <h1>USER</h1>
            </div>
        );
    }
}

export default connect(
    state => ({
        stateStore: state
    }),
    dispatch => ({
        getUser: () => {
            dispatch({type: 'GET_USER_REQUEST'});
        },
    })
)(User)
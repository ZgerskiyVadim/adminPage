import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import * as actions from '../../actions/constants';

class User extends Component {
    constructor(props) {
        super(props);

        this.search = this.search.bind(this);
    }

    search(event) {
        this.props.search(event.target.value);
    }

    update(id) {
        console.log('update id', id);
    }

    remove(id) {
        this.props.removeUser(id);
    }

    render() {
        return (
            <div className='user-row'>
                <Link to={`users/${this.props.user._id}`}>{this.props.user.username}</Link>
                <Link to={`users/${this.props.user._id}`}>{this.props.user.firstName}</Link>
                <Link to={`users/${this.props.user._id}`}>{this.props.user.lastName}</Link>
                <Link to={`users/${this.props.user._id}`}>{this.props.user.email}</Link>
                <button onClick={this.update.bind(this, this.props.user._id)}>Update</button>
                <button onClick={this.remove.bind(this, this.props.user._id)}>Remove</button>
            </div>
        );
    }
}

export default connect(
    state => ({
        stateStore: state
    }),
    dispatch => ({
        removeUser: (id) => {
            dispatch({type: actions.REMOVE_USER_REQUEST, payload: id});
        }
    })
)(User)
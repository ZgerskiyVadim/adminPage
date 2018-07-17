import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import './index.scss';

class User extends Component {
    constructor(props) {
        super(props);

        this.search = this.search.bind(this);
        this.update = this.update.bind(this);
        this.remove = this.remove.bind(this);
    }

    search(event) {
        this.props.search(event.target.value);
    }

    update(id) {

    }

    remove(id) {
        this.props.removeUser(id);
    }

    render() {
        return (
            <div>
                <Link to={`users/${this.props.user._id}`}>{this.props.user.username}</Link>
                <Link to={`users/${this.props.user._id}`}>{this.props.user.firstName}</Link>
                <Link to={`users/${this.props.user._id}`}>{this.props.user.lastName}</Link>
                <Link to={`users/${this.props.user._id}`}>{this.props.user.email}</Link>
                <button onClick={this.update(this, this.props.user._id)}>Update</button>
                <button onClick={this.remove(this, this.props.user._id)}>Remove</button>
            </div>

        );
    }
}

export default connect(
    state => ({
        stateStore: state
    }),
    dispatch => ({
        getUsers: () => {
            dispatch({type: 'GET_USERS_REQUEST'});
        },
        search: (query) => {
            dispatch({type: 'SEARCH_USERS_REQUEST', payload: query});
        },
        removeUser: (id) => {
            dispatch({type: 'REMOVE_USER_REQUEST', payload: id});
        }
    })
)(User)
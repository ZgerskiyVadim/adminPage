import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import './index.scss';

class Users extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.getUsers();
    }

    search(event) {
        this.props.search(event.target.value);
    }

    update() {

    }

    remove(id) {
        this.props.removeUser(id);
    }

    render() {
        return (
            <div>
                <h1>Search</h1>
                <input type="text" onChange={this.search.bind(this, event)}/>
                <div className='listUsers'>
                    <div className={'username'}>
                        <h1>username</h1>
                        {
                            this.props.stateStore.usersReducer.map(item =>
                                <div key={item._id}>
                                    <Link to={`users/${item._id}`}>
                                        <span>{item.username}</span>
                                    </Link>
                                </div>
                            )
                        }
                    </div>
                    <div className={'firstName'}>
                        <h1>firstName</h1>
                        {
                            this.props.stateStore.usersReducer.map(item =>
                                <div key={item._id}>
                                    <Link to={`users/${item._id}`}>
                                        <span>{item.firstName}</span>
                                    </Link>
                                </div>
                            )
                        }
                    </div>
                    <div className={'lastName'}>
                        <h1>lastName</h1>
                        {
                            this.props.stateStore.usersReducer.map(item =>
                                <div key={item._id}>
                                    <Link to={`users/${item._id}`}>
                                        <span>{item.lastName}</span>
                                    </Link>
                                </div>
                            )
                        }
                    </div>
                    <div className={'email'}>
                        <h1>email</h1>
                        {
                            this.props.stateStore.usersReducer.map(item =>
                                <div key={item._id}>
                                    <Link to={`users/${item._id}`}>
                                        <span>{item.email}</span>
                                    </Link>
                                </div>
                            )
                        }
                    </div>
                    <div className={'modification'}>
                        <h1>modification</h1>
                        {
                            this.props.stateStore.usersReducer.map(item =>
                                <div key={item._id}>
                                    <button onClick={this.update.bind(this, item._id)}>Update</button>
                                    <button onClick={this.remove.bind(this, item._id)}>Remove</button>
                                </div>
                            )
                        }
                    </div>
                </div>
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
            dispatch({type: 'SEARCH_USERS', payload: query});
        },
        removeUser: (id) => {
            dispatch({type: 'REMOVE_USER_REQUEST', payload: id});
        }
    })
)(Users)
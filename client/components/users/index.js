import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import './index.scss';
import User from './user';

class Users extends Component {
    constructor(props) {
        super(props);

        this.search = this.search.bind(this)
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
                <input type="text" onChange={this.search}/>
                <div className='listUsers'>
                    <div className={'username'}>
                        <h1>username</h1>
                        <h1>firstName</h1>
                        <h1>lastName</h1>
                        <h1>email</h1>
                        {
                            this.props.stateStore.usersReducer.map(user =>
                                <User key={user._id} user={user}/>
                            )
                        }
                    </div>
                    {/*<div className={'firstName'}>*/}
                        {/*<h1>firstName</h1>*/}
                        {/*{*/}
                            {/*this.props.stateStore.usersReducer.map(user =>*/}
                                {/*<div key={user._id}>*/}
                                    {/*<Link to={`users/${user._id}`}>*/}
                                        {/*<span>{user.firstName}</span>*/}
                                    {/*</Link>*/}
                                {/*</div>*/}
                            {/*)*/}
                        {/*}*/}
                    {/*</div>*/}
                    {/*<div className={'lastName'}>*/}
                        {/*<h1>lastName</h1>*/}
                        {/*{*/}
                            {/*this.props.stateStore.usersReducer.map(user =>*/}
                                {/*<div key={user._id}>*/}
                                    {/*<Link to={`users/${user._id}`}>*/}
                                        {/*<span>{user.lastName}</span>*/}
                                    {/*</Link>*/}
                                {/*</div>*/}
                            {/*)*/}
                        {/*}*/}
                    {/*</div>*/}
                    {/*<div className={'email'}>*/}
                        {/*<h1>email</h1>*/}
                        {/*{*/}
                            {/*this.props.stateStore.usersReducer.map(user =>*/}
                                {/*<div key={user._id}>*/}
                                    {/*<Link to={`users/${user._id}`}>*/}
                                        {/*<span>{user.email}</span>*/}
                                    {/*</Link>*/}
                                {/*</div>*/}
                            {/*)*/}
                        {/*}*/}
                    {/*</div>*/}
                    {/*<div className={'modification'}>*/}
                        {/*<h1>modification</h1>*/}
                        {/*{*/}
                            {/*this.props.stateStore.usersReducer.map(user =>*/}
                                {/*<div key={user._id}>*/}
                                    {/*<button onClick={this.update.bind(this, user._id)}>Update</button>*/}
                                    {/*<button onClick={this.remove.bind(this, user._id)}>Remove</button>*/}
                                {/*</div>*/}
                            {/*)*/}
                        {/*}*/}
                    {/*</div>*/}
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
            dispatch({type: 'SEARCH_USERS_REQUEST', payload: query});
        },
        removeUser: (id) => {
            dispatch({type: 'REMOVE_USER_REQUEST', payload: id});
        }
    })
)(Users)
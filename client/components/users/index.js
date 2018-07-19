import React, { Component } from 'react';
import { connect } from 'react-redux';
import './index.scss';
import * as actions from '../../actions/constants';
import User from './user';

class Users extends Component {
    constructor(props) {
        super(props);

        this.search = this.search.bind(this)
    }

    componentDidMount() {
        this.props.getUsers();
    }

    hideCurrentUserJoiningGroup() {
        return this.props.stateStore.usersReducer.filter(user => user._id !== this.props.stateStore.userReducer.user._id)
    }

    search(event) {
        this.props.search(event.target.value);
    }

    render() {
        return (
            <div className='users'>
                <div className='users-search'>
                    <h2>Search</h2>
                    <input onChange={this.search} className='form-control col-md-3' type="text"/>
                </div>
                <div>
                    <div className='users-headers col-md-9'>
                        <h2 className='col-md-3'>username</h2>
                        <h2 className='col-md-3'>firstName</h2>
                        <h2 className='col-md-3'>lastName</h2>
                        <h2 className='col-md-3'>email</h2>
                    </div>
                    {
                        this.props.stateStore.userReducer.joiningGroup ?

                            this.hideCurrentUserJoiningGroup().map(user =>
                                <User user={user} key={user._id}/>) :

                        this.props.stateStore.usersReducer.map(user =>
                            <User user={user} key={user._id}/>
                        )
                    }
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
            dispatch({type: actions.GET_USERS_REQUEST});
        },
        search: (query) => {
            dispatch({type: actions.SEARCH_USERS_REQUEST, payload: query});
        },
    })
)(Users)
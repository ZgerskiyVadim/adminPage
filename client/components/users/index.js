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

    search(event) {
        this.props.search(event.target.value);
    }

    render() {
        return (
            <div>
                <h1>Search</h1>
                <input type="text" onChange={this.search}/>
                <div className='listUsers'>
                    <div className={'headers'}>
                        <h1>username</h1>
                        <h1>firstName</h1>
                        <h1>lastName</h1>
                        <h1>email</h1>
                    </div>
                    {
                        this.props.stateStore.usersReducer.map(user =>
                            <User key={user._id} user={user}/>
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
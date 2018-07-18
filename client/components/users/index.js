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
            <div className='users'>
                <h1>Search</h1>
                <input onChange={this.search} className='form-control col-md-4' type="text"/>
                <div>
                    <div className='users-headers col-md-9'>
                        <h1 className='col-md-3'>username</h1>
                        <h1 className='col-md-3'>firstName</h1>
                        <h1 className='col-md-3'>lastName</h1>
                        <h1 className='col-md-3'>email</h1>
                    </div>
                    {
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
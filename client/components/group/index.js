import React, { Component } from 'react';
import {connect} from "react-redux";
import './index.scss';
import * as actions from '../../actions/constants';

class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            groupID: this.props.match.params.id
        }
    }

    componentDidMount() {
        this.props.getGroup(this.state.groupID);
    }

    removeUser(id) {
        this.props.removeUser(this.state.groupID, id)
    }

    render() {
        return (
            <div>
                <h1>GROUP</h1>
                <h3>name: {this.props.stateStore.groupReducer.name}</h3>
                <h3>title: {this.props.stateStore.groupReducer.title}</h3>
                <h1>Users</h1>
                {
                    this.props.stateStore.groupReducer.users.map(user =>
                        <div className='users' key={user._id}>
                            <div>
                                <h4>name: {user.username}</h4>
                                <h4>title: {user.firstName}</h4>
                                <h4>title: {user.lastName}</h4>
                                <h4>title: {user.email}</h4>
                            </div>
                            <button onClick={this.removeUser.bind(this, user._id)}>remove user</button>
                        </div>
                    )
                }
            </div>
        );
    }
}

export default connect(
    state => ({
        stateStore: state
    }),
    dispatch => ({
        getGroup: (id) => {
            dispatch({type: actions.GET_GROUP_REQUEST, payload: id});
        },
        updateGroup: (options) => {
            dispatch({type: actions.UPDATE_GROUP_REQUEST, payload: options});
        },
        removeUser: (groupID, userID) => {
            dispatch({type: actions.REMOVE_USER_FROM_GROUP, payload: {userID, groupID}});
        }
    })
)(User)
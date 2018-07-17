import React, { Component } from 'react';
import {connect} from "react-redux";
import './index.scss';
import * as actions from '../../actions/constants';

class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userID: this.props.match.params.id
        }
    }

    componentDidMount() {
        this.props.getUser(this.state.userID);
    }

    leaveGroup(id) {
        this.props.leaveGroup(this.state.userID, id)
    }

    render() {
        return (
            <div>
               <h1>USER</h1>
                <h3>username: {this.props.stateStore.userReducer.user.username}</h3>
                <h3>firstName: {this.props.stateStore.userReducer.user.firstName}</h3>
                <h3>lastName: {this.props.stateStore.userReducer.user.lastName}</h3>
                <h3>email: {this.props.stateStore.userReducer.user.email}</h3>
                <h1>Groups</h1>
                {
                    this.props.stateStore.userReducer.groups.map(group =>
                        <div className='groups' key={group._id}>
                            <div>
                                <h4>name: {group.name}</h4>
                                <h4>title: {group.title}</h4>
                            </div>
                            <button onClick={this.leaveGroup.bind(this, group._id)}>leave group</button>
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
        getUser: (id) => {
            dispatch({type: actions.GET_USER_REQUEST, payload: id});
        },
        updateUser: (options) => {
            dispatch({type: actions.UPDATE_USER_REQUEST, payload: options});
        },
        leaveGroup: (userID, groupID) => {
            dispatch({type: actions.LEAVE_GROUP_REQUEST, payload: {userID, groupID}});
        }
    })
)(User)
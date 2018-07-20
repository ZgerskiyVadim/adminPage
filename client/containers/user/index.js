import React, { Component } from 'react';
import {connect} from "react-redux";
import { Link } from "react-router-dom";
import './index.scss';
import * as types from '../../actions';
import { onChangeForm, showForms, getOptions } from '../../services/userAndGroupHelper';

class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            username: '',
            firstName: '',
            lastName: '',
            email: '',
            id: this.props.match.params.id
        };

        this.onChangeForm = onChangeForm.bind(this);
        this.update = this.update.bind(this);
        this.joinGroup = this.joinGroup.bind(this);
    }

    componentDidMount() {
        const isJoining = false;
        this.props.joinGroup(isJoining);
        this.props.getUser(this.state.id);
    }

    update() {
        this.setState({show: false});
        const options = getOptions(this.state);
        this.props.updateUser(options);
    }

    joinGroup() {
        const isJoining = true;
        this.props.joinGroup(isJoining);
        this.props.history.push('/groups');
    }

    leaveGroup(id) {
        this.props.leaveGroup(this.state.id, id)
    }

    render() {
        const hiddenForm = {display: this.state.show ? "block" : "none"};
        const shownForm = {display: !this.state.show ? "block" : "none"};
        const isGroups = {display: this.props.stateStore.userReducer.groups.length ? 'block' : 'none'};

        return (
            <div className='user'>
               <h1>USER</h1>
                <div className='user-info'>
                    <div className='user--margin-right'>
                        <h3>username: {this.props.stateStore.userReducer.user.username}</h3>
                        <input onChange={this.onChangeForm} value={this.state.username} className='form-control' style={hiddenForm} name='username' type="text"/>
                        <h3>firstName: {this.props.stateStore.userReducer.user.firstName}</h3>
                        <input onChange={this.onChangeForm} value={this.state.firstName} className='form-control' style={hiddenForm} name='firstName' type="text"/>
                        <h3>lastName: {this.props.stateStore.userReducer.user.lastName}</h3>
                        <input onChange={this.onChangeForm} value={this.state.lastName} className='form-control' style={hiddenForm} name='lastName' type="text"/>
                        <h3>email: {this.props.stateStore.userReducer.user.email}</h3>
                        <input onChange={this.onChangeForm} value={this.state.email} className='form-control' style={hiddenForm} name='email' type="text"/>
                    </div>
                    <button onClick={showForms.bind(this, this.state.id)} style={shownForm} className='user--margin-right btn btn-outline-primary'>Update</button>
                    <button onClick={this.update} style={hiddenForm} className='user--margin-right btn btn-outline-primary'>Save</button>
                    <button onClick={this.joinGroup} className='btn btn-outline-info'>Join group</button>
                </div>

                <h1 style={isGroups}>Groups</h1>
                {
                    this.props.stateStore.userReducer.groups.map(group =>
                        <div className='user__groups col-md-4' key={group._id}>
                            <div>
                                <Link to={`/groups/${group._id}`}>
                                    <h4>name: {group.name}</h4>
                                </Link>
                                <Link to={`/groups/${group._id}`}>
                                    <h4>title: {group.title}</h4>
                                </Link>
                            </div>
                            <button onClick={this.leaveGroup.bind(this, group._id)} className='user__leave-group btn btn-outline-danger'>leave group</button>
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
            dispatch({type: types.GET_USER_REQUEST, payload: id});
        },
        updateUser: (options) => {
            dispatch({type: types.UPDATE_USER_REQUEST, payload: options});
        },
        joinGroup: (isJoining) => {
            dispatch({type: types.IS_JOINING_GROUP, payload: isJoining})
        },
        leaveGroup: (userID, groupID) => {
            dispatch({type: types.LEAVE_GROUP_REQUEST, payload: {userID, groupID}});
        }
    })
)(User)
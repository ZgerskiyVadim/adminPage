import React, { Component } from 'react';
import {connect} from "react-redux";
import './index.scss';
import * as actions from '../../actions/constants';
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
        }
    }

    componentDidMount() {
        this.props.getUser(this.state.id);
    }

    update() {
        this.setState({show: false});
        const options = getOptions(this.state);
        this.props.updateUser(options);
    }

    joinGroup() {
        this.props.joinGroup();
        this.props.history.push('/groups');
    }

    leaveGroup(id) {
        this.props.leaveGroup(this.state.id, id)
    }

    render() {
        const hiddenForm = {display: this.state.show ? "block" : "none"};
        const shownForm = {display: !this.state.show ? "block" : "none"};
        const showGroups = {display: this.props.stateStore.userReducer.groups.length ? 'block' : 'none'};

        return (
            <div>
               <h1>USER</h1>
                <div className='user'>
                    <div>
                        <h3>username: {this.props.stateStore.userReducer.user.username}</h3>
                        <input onChange={onChangeForm.bind(this)} value={this.state.username} className='form-control' style={hiddenForm} name='username' type="text"/>
                        <h3>firstName: {this.props.stateStore.userReducer.user.firstName}</h3>
                        <input onChange={onChangeForm.bind(this)} value={this.state.firstName} className='form-control' style={hiddenForm} name='firstName' type="text"/>
                        <h3>lastName: {this.props.stateStore.userReducer.user.lastName}</h3>
                        <input onChange={onChangeForm.bind(this)} value={this.state.lastName} className='form-control' style={hiddenForm} name='lastName' type="text"/>
                        <h3>email: {this.props.stateStore.userReducer.user.email}</h3>
                        <input onChange={onChangeForm.bind(this)} value={this.state.email} className='form-control' style={hiddenForm} name='email' type="text"/>
                    </div>
                    <button onClick={showForms.bind(this, this.state.id)} style={shownForm} className='btn btn-outline-primary'>Update</button>
                    <button onClick={this.update.bind(this)} style={hiddenForm} className='btn btn-outline-primary'>Save</button>
                    <button onClick={this.joinGroup.bind(this)} className='btn btn-outline-info'>Join group</button>
                </div>

                <h1 style={showGroups}>Groups</h1>
                {
                    this.props.stateStore.userReducer.groups.map(group =>
                        <div className='user-groups' key={group._id}>
                            <div>
                                <h4>name: {group.name}</h4>
                                <h4>title: {group.title}</h4>
                            </div>
                            <button onClick={this.leaveGroup.bind(this, group._id)} className='btn btn-outline-danger'>leave group</button>
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
        joinGroup: () => {
            dispatch({type: actions.IS_JOINING_GROUP, payload: true})
        },
        leaveGroup: (userID, groupID) => {
            dispatch({type: actions.LEAVE_GROUP_REQUEST, payload: {userID, groupID}});
        }
    })
)(User)
import React, { Component } from 'react';
import { Link } from "react-router-dom";

import { onChangeForm, showForms, getValidOptions } from '../../services/formsOperations';


class Group extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            name: '',
            title: '',
            id: '',
            userID: this.props.userID ? this.props.userID : null
        };

        this.showForms = showForms.bind(this, this.props.group._id);
        this.onChangeForm = onChangeForm.bind(this);
        this.joinGroup = this.props.joinGroup;
        this.update = this.props.update;
        this.remove = this.props.remove;
        this.leaveGroup = this.props.leaveGroup;
    }

    sendOptionsUpdate = () => {
        this.setState({show: false});
        const options = getValidOptions(this.state);
        this.update(options)
    };

    sendOptionsJoinGroup = (groupID) => (e) => {
        const userID = this.state.userID;
        userID && this.joinGroup({userID, groupID});
    };

    sendOptionsLeaveGroup = (groupID) => (e) => {
        const userID = this.state.userID;
        userID && this.leaveGroup({userID, groupID});
    };

    render() {
        const { isJoiningGroup } = this.props;
        const { isJoinUserInGroup } = this.props.group;

        const hiddenForm = {display: this.state.show && !isJoiningGroup ? "block" : "none"};
        const shownForm = {display: !this.state.show && !isJoiningGroup ? "block" : "none"};
        const notJoiningGroup = {display: !isJoiningGroup ? "block" : "none"};
        const userAlreadyInGroup = {display: !isJoiningGroup || isJoinUserInGroup ? 'none' : 'block'};
        const userNotInGroup = {display: isJoiningGroup && isJoinUserInGroup ? 'block' : 'none'};

        return (
            <div className='groups-row'>
                <div className='groups-row col-md-8'>
                    <div className='col-md-4'>
                        <Link to={`groups/${this.props.group._id}`}>{this.props.group.name}</Link>
                        <input onChange={this.onChangeForm} value={this.state.name} className='form-control' style={hiddenForm} name='name' type="text"/>
                    </div>
                    <div className='col-md-4'>
                        <Link to={`groups/${this.props.group._id}`}>{this.props.group.title}</Link>
                        <input onChange={this.onChangeForm} value={this.state.title} className='form-control' style={hiddenForm} name='title' type="text"/>
                    </div>
                    <div className='col-md-4'>
                        <span>{this.props.group.users.length}</span>
                    </div>
                </div>

                <div className='groups-buttons'>
                    <button onClick={this.showForms} style={shownForm} className='groups--margin-right btn btn-outline-primary'>Update</button>
                    <button onClick={this.sendOptionsUpdate} style={hiddenForm} className='groups--margin-right btn btn-outline-primary'>Save</button>
                    <button onClick={this.remove(this.props.group._id)} style={notJoiningGroup} className='btn btn-outline-danger'>Remove</button>
                    <button onClick={this.sendOptionsJoinGroup(this.props.group._id)} style={userAlreadyInGroup} className='btn btn-outline-info'>Join group</button>
                    <button onClick={this.sendOptionsLeaveGroup(this.props.group._id)} style={userNotInGroup} className='btn btn-outline-danger'>Leave group</button>
                </div>
            </div>
        );
    }
}

export default Group
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import classNames from 'classnames';

import {handleChangeForm, showForms, getValidOptions} from '../../services/formsOperations';


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
        this.handleChangeForm = handleChangeForm.bind(this);
    }

    sendOptionsUpdate = () => {
        this.setState({show: false});
        const options = getValidOptions(this.state);
        this.props.update(options)
    };

    sendOptionsJoinGroup = (groupID) => (e) => {
        const userID = this.state.userID;
        userID && this.props.joinGroup({userID, groupID});
    };

    sendOptionsLeaveGroup = (groupID) => (e) => {
        const userID = this.state.userID;
        userID && this.props.leaveGroup({userID, groupID});
    };

    render() {
        const { isJoiningGroup, isJoinedUserInGroup } = this.props;
        const {users, name, title, _id} = this.props.group;

        const hiddenForm = classNames({'groups--hide': !this.state.show});
        const shownForm = classNames({'groups--hide': this.state.show});
        const notJoiningGroup = classNames({'groups--hide': isJoiningGroup});
        const userAlreadyInGroup = classNames({'groups--hide': !isJoiningGroup || isJoinedUserInGroup});
        const userNotInGroup = classNames({'groups--hide': !isJoiningGroup || !isJoinedUserInGroup});

        return (
            <div className='groups-row'>
                <div className='groups-row col-md-8'>
                    <div className='col-md-4'>
                        <Link to={`groups/${_id}`}>{name}</Link>
                        <input onChange={this.handleChangeForm} value={this.state.name} className={classNames('form-control', hiddenForm)} name='name' type="text"/>
                    </div>
                    <div className='col-md-4'>
                        <Link to={`groups/${_id}`}>{title}</Link>
                        <input onChange={this.handleChangeForm} value={this.state.title} className={classNames('form-control', hiddenForm)} name='title' type="text"/>
                    </div>
                    <div className='col-md-4'>
                        <span>{users.length}</span>
                    </div>
                </div>

                <div className='groups-buttons'>
                    <button onClick={this.showForms} className={classNames('groups--margin-right btn btn-outline-primary', shownForm, notJoiningGroup)}>Update</button>
                    <button onClick={this.sendOptionsUpdate} className={classNames('groups--margin-right btn btn-outline-primary', hiddenForm)}>Save</button>
                    <button onClick={this.props.remove(_id)} className={classNames('btn btn-outline-danger', notJoiningGroup)}>Remove</button>
                    <button onClick={this.sendOptionsJoinGroup(_id)} className={classNames('btn btn-outline-info', userAlreadyInGroup)}>Join group</button>
                    <button onClick={this.sendOptionsLeaveGroup(_id)} className={classNames('btn btn-outline-danger', userNotInGroup)}>Leave group</button>
                </div>
            </div>
        );
    }
}

export default Group;

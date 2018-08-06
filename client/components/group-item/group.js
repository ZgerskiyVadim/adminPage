import React, {Component} from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import {handleChangeState, showForms, getValidOptions} from '../../services/formsOperations';

class Group extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showForm: false,
            name: '',
            title: '',
            id: '',
            userID: this.props.userID ? this.props.userID : null
        };

        this.showForms = showForms.bind(this, this.props.group._id);
        this.handleChangeState = handleChangeState.bind(this);
    }

    goToGroup = () => {
        const {_id} = this.props.group;
        this.props.history.push(`/groups/${_id}`);
    };

    handleClick = (e) => {
        e.stopPropagation();
    };

    sendOptionsUpdate = (e) => {
        e.stopPropagation();
        this.setState({showForm: false});
        const options = getValidOptions(this.state);
        this.props.update(options)
    };

    sendOptionsJoinGroup = (groupID) => (e) => {
        e.stopPropagation();
        const userID = this.state.userID;
        userID && this.props.joinGroup({userID, groupID});
    };

    sendOptionsLeaveGroup = (groupID) => (e) => {
        e.stopPropagation();
        const userID = this.state.userID;
        userID && this.props.leaveGroup({userID, groupID});
    };

    remove = (id) => (e) => {
        this.props.showModal(id, e);
    };

    render() {
        const { isJoiningGroup, isJoinedUserInGroup, index } = this.props;
        const {users, name, title, _id} = this.props.group;
        const {showForm, ...state} = this.state;

        const hiddenForm = classNames({'groups--hide': !showForm});
        const shownForm = classNames({'groups--hide': showForm});
        const notJoiningGroup = classNames({'groups--hide': isJoiningGroup});
        const userAlreadyInGroup = classNames({'groups--hide': !isJoiningGroup || isJoinedUserInGroup});
        const userNotInGroup = classNames({'groups--hide': !isJoiningGroup || !isJoinedUserInGroup});

        return (
            <tbody>
            <tr onClick={this.goToGroup} className='groups--cursor'>
                <th>{index + 1}</th>
                <td>
                    <h5>{name}</h5>
                    <input onChange={this.handleChangeState} onClick={this.handleClick} value={state.name} className={classNames('form-control', hiddenForm)} name='name' type="text"/>
                </td>
                <td>
                    <h5>{title}</h5>
                    <input onChange={this.handleChangeState} onClick={this.handleClick} value={state.title} className={classNames('form-control', hiddenForm)} name='title' type="text"/>
                </td>
                <td>
                    <h5>{users.length}</h5>
                </td>
                <td>
                    <button onClick={this.showForms} className={classNames('groups--margin-right btn btn-outline-primary', shownForm, notJoiningGroup)}>Update</button>
                    <button onClick={this.sendOptionsUpdate} className={classNames('groups--margin-right btn btn-outline-primary', hiddenForm)}>Save</button>
                    <button onClick={this.remove(_id)} className={classNames('btn btn-outline-danger', notJoiningGroup)}>Remove</button>
                    <button onClick={this.sendOptionsJoinGroup(_id)} className={classNames('btn btn-outline-info', userAlreadyInGroup)}>Join group</button>
                    <button onClick={this.sendOptionsLeaveGroup(_id)} className={classNames('btn btn-outline-danger', userNotInGroup)}>Leave group</button>
                </td>
            </tr>
            </tbody>
        );
    }
}

Group.propTypes = {
    group: PropTypes.object.isRequired,
    update: PropTypes.func,
    remove: PropTypes.func,
    joinGroup: PropTypes.func,
    leaveGroup: PropTypes.func
};

export default Group;

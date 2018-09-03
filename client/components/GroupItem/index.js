import React, {Component} from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

import formsOperations from '../../services/formsOperations';
import redirectOnPage from '../../services/redirectOnPage';

export class GroupItem extends Component {
    constructor(props) {
        super(props);

        const {name, title} = this.props.group;
        this.state = {
            showForm: false,
            name,
            title,
            id: this.props.group._id,
            userID: this.props.userID ? this.props.userID : null
        };

        this.showForms = this.showForms.bind(this);
        this.handleChange = formsOperations.handleChange.bind(this);
        this.goToGroup = this.goToGroup.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.sendOptionsUpdate = this.sendOptionsUpdate.bind(this);
        this.sendOptionsJoinGroup = this.sendOptionsJoinGroup.bind(this);
        this.sendOptionsLeaveGroup = this.sendOptionsLeaveGroup.bind(this);
        this.remove = this.remove.bind(this);
    }

    goToGroup() {
        const {_id} = this.props.group;
        !this.state.showForm && redirectOnPage.path(`/groups/${_id}`);
    };

    handleClick(event) {
        event.stopPropagation();
    };

    showForms(event) {
        event.stopPropagation();
        this.setState({
            showForm: true
        });
    }

    sendOptionsUpdate(event) {
        event.stopPropagation();
        this.setState({showForm: false}, () => {
            const options = formsOperations.getValidOptions(this.state);
            this.props.update(options);
        });
    };

    sendOptionsJoinGroup(groupID, event) {
        event.stopPropagation();
        const userID = this.state.userID;

        userID && this.props.joinGroup({userID, groupID});
    };

    sendOptionsLeaveGroup(groupID, event) {
        event.stopPropagation();
        const userID = this.state.userID;

        userID && this.props.leaveGroup({userID, groupID});
    };

    remove(id, event) {
        this.props.showModal(id, event);
    };

    render() {
        const { isJoiningGroup, userJoinedGroup, index } = this.props;
        const {users, name, title, _id} = this.props.group;
        const {showForm, ...state} = this.state;

        const hiddenForm = classNames({'groups--hide': !showForm});
        const shownForm = classNames({'groups--hide': showForm});
        const notJoiningGroup = classNames({'groups--hide': isJoiningGroup});
        const userAlreadyInGroup = classNames({'groups--hide': !isJoiningGroup || userJoinedGroup});
        const userNotInGroup = classNames({'groups--hide': !isJoiningGroup || !userJoinedGroup});

        return (
            <tbody>
            <tr onClick={this.goToGroup} className='groups--cursor'>
                <td style={{display: 'none'}}>
                    <form id={'groups-form' + (index + 1)} />
                </td>
                <th>{index + 1}</th>
                <td>
                    <label htmlFor={'groups-name' + (index + 1)}>{name}</label>
                    <input onChange={this.handleChange} onClick={this.handleClick} value={state.name} className={classNames('form-control', hiddenForm)} name='name' id={'groups-name' + (index + 1)} form={'groups-form' + (index + 1)} type="text"/>
                </td>
                <td>
                    <label htmlFor={'groups-title' + (index + 1)}>{title}</label>
                    <input onChange={this.handleChange} onClick={this.handleClick} value={state.title} className={classNames('form-control', hiddenForm)} name='title' id={'groups-title' + (index + 1)} form={'groups-form' + (index + 1)} type="text"/>
                </td>
                <td>
                    <h5>{users.length}</h5>
                </td>
                <td className='groups__buttons'>
                    <button onClick={this.showForms} className={classNames('groups__update groups--margin-right btn btn-outline-primary', shownForm, notJoiningGroup)} type='button'>Update</button>
                    <button onClick={this.sendOptionsUpdate} className={classNames('groups--margin-right btn btn-outline-primary', hiddenForm)} type='submit' form={'groups-form' + (index + 1)}>Save</button>
                    <button onClick={(event) => this.remove(_id, event)} className={classNames('groups__remove btn btn-outline-danger', notJoiningGroup)} type='button'>Remove</button>
                    <button onClick={(event) => this.sendOptionsJoinGroup(_id, event)} className={classNames('btn btn-outline-info', userAlreadyInGroup)} type='button'>Join group</button>
                    <button onClick={(event) => this.sendOptionsLeaveGroup(_id, event)} className={classNames('btn btn-outline-danger', userNotInGroup)} type='button'>Leave group</button>
                </td>
            </tr>
            </tbody>
        );
    }
}

GroupItem.propTypes = {
    group: PropTypes.object.isRequired,
    update: PropTypes.func,
    showModal: PropTypes.func,
    joinGroup: PropTypes.func,
    leaveGroup: PropTypes.func
};

export default withRouter(GroupItem);

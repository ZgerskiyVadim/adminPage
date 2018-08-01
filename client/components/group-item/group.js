import React, {Component} from 'react';
import {Link} from 'react-router-dom';
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

    sendOptionsUpdate = () => {
        this.setState({showForm: false});
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
        const {showForm, ...state} = this.state;

        const hiddenForm = classNames({'groups--hide': !showForm});
        const shownForm = classNames({'groups--hide': showForm});
        const notJoiningGroup = classNames({'groups--hide': isJoiningGroup});
        const userAlreadyInGroup = classNames({'groups--hide': !isJoiningGroup || isJoinedUserInGroup});
        const userNotInGroup = classNames({'groups--hide': !isJoiningGroup || !isJoinedUserInGroup});

        return (
            <div className='groups-row'>
                <div className='groups-row col-md-8'>
                    <div className='col-md-4'>
                        <Link to={`groups/${_id}`}>{name}</Link>
                        <input onChange={this.handleChangeState} value={state.name} className={classNames('form-control', hiddenForm)} name='name' type="text"/>
                    </div>
                    <div className='col-md-4'>
                        <Link to={`groups/${_id}`}>{title}</Link>
                        <input onChange={this.handleChangeState} value={state.title} className={classNames('form-control', hiddenForm)} name='title' type="text"/>
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

Group.propTypes = {
    group: PropTypes.object.isRequired,
    update: PropTypes.func.isRequired,
    remove: PropTypes.func.isRequired,
    joinGroup: PropTypes.func,
    leaveGroup: PropTypes.func
};

export default Group;

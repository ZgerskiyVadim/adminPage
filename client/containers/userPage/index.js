import React, {Component} from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import toastr from 'toastr';

import './index.scss';
import * as usersActionCreators from '../../actions/action_creators/users';
import * as groupsActionCreators from '../../actions/action_creators/groups';
import {handleChangeState, showForms, getValidOptions} from '../../services/formsOperations';
import {getErrorMessage} from '../../services/getErrorMessage';

class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showForm: false,
            username: '',
            firstName: '',
            lastName: '',
            email: '',
            id: this.props.match.params.id
        };

        this.handleChangeState = handleChangeState.bind(this);
        this.showForms = showForms.bind(this, this.state.id);
    }

    componentDidMount() {
        const isJoiningGroup = false;
        this.props.actions.startJoiningGroup(isJoiningGroup);
        this.props.actions.getUserRequest(this.state.id);
    }

    componentWillReceiveProps(nextProps) {
        const {error, isLeftGroup, isUpdated} = nextProps.userStore;
        const errorMessage = getErrorMessage(nextProps.userStore);

        const status = error && (error.response.data.status || error.response.status);
        if (status === 404) {
            toastr.error('User not found!', 'Opps!');
            return this.props.history.push('/');
        }
        error && toastr.error(errorMessage, 'Opps!');
        isLeftGroup && toastr.info('User left group', 'Ok!');
        isUpdated && toastr.success('User updated', 'Ok!');
    }

    goToGroup = (id) => (e) => {
        this.props.history.push(`/groups/${id}`);
    };

    update = () => {
        this.setState({showForm: false});
        const options = getValidOptions(this.state);
        this.props.actions.updateUserRequest(options);
    };

    startJoiningGroup = (e) => {
        e.stopPropagation();
        const isJoiningGroup = true;
        this.props.actions.startJoiningGroup(isJoiningGroup);
        this.props.history.push('/groups');
    };

    joinGroup = (id) => (e) => {
        e.stopPropagation();
        const options = {
            userID: this.state.id,
            groupID: id
        };
        this.props.actions.joinGroup(options);
    };

    leaveGroup = (id) => (e) => {
        e.stopPropagation();
        const options = {
            userID: this.state.id,
            groupID: id
        };
        this.props.actions.leaveGroupRequest(options);
    };

    render() {
        const {username, firstName, lastName, email} = this.props.userStore.user;
        const {groups} = this.props;
        const {showForm, ...state} = this.state;

        const hiddenForm = classNames({'user--hide': !showForm});
        const shownForm = classNames('user--margin-right btn btn-outline-primary', {'user--hide': showForm});
        const isGroups = classNames({'user--hide': !groups.length});

        return (
            <div className='user'>
                <h1>USER</h1>
                <div className='user-info'>
                    <div className='user--margin-right'>
                        <h3>username: {username}</h3>
                        <input onChange={this.handleChangeState} value={state.username} className={classNames('form-control', hiddenForm)} name='username' type="text"/>
                        <h3>firstName: {firstName}</h3>
                        <input onChange={this.handleChangeState} value={state.firstName} className={classNames('form-control', hiddenForm)} name='firstName' type="text"/>
                        <h3>lastName: {lastName}</h3>
                        <input onChange={this.handleChangeState} value={state.lastName} className={classNames('form-control', hiddenForm)} name='lastName' type="text"/>
                        <h3>email: {email}</h3>
                        <input onChange={this.handleChangeState} value={state.email} className={classNames('form-control', hiddenForm)} name='email' type="text"/>
                    </div>
                    <button onClick={this.showForms} className={shownForm}>Update</button>
                    <button onClick={this.update} className={classNames('user--margin-right btn btn-outline-primary', hiddenForm)}>Save</button>
                    <button onClick={this.startJoiningGroup} className='btn btn-outline-info'>Join group</button>
                </div>

                <h1 className={isGroups}>Groups</h1>
                <table className={classNames('table table-hover', isGroups)}>
                    <thead className='thead-dark'>
                    <tr>
                        <th>
                            <h5>#</h5>
                        </th>
                        <th>
                            <h5>name</h5>
                        </th>
                        <th>
                            <h5>title</h5>
                        </th>
                        <th>
                            <h5>users</h5>
                        </th>
                        <th/>
                    </tr>
                    </thead>
                    {
                        groups.map((group, index) =>
                            <tbody key={group._id}>
                            <tr onClick={this.goToGroup(group._id)} className={classNames('user__groups-list', {'user--light-grey': group.isLeftGroup})}>
                                <th>{index + 1}</th>
                                <td>
                                    <h5>{group.name}</h5>
                                </td>
                                <td>
                                    <h5>{group.title}</h5>
                                </td>
                                <td>
                                    <h5>{group.users.length}</h5>
                                </td>
                                <td>
                                    <button onClick={this.leaveGroup(group._id)} className={classNames('user__leave-group btn btn-outline-danger', {'user--hide': group.isLeftGroup})}>leave group</button>
                                    <button onClick={this.joinGroup(group._id)} className={classNames('user__leave-group btn btn-outline-info', {'user--hide': !group.isLeftGroup})}>join group</button>
                                </td>
                            </tr>
                            </tbody>
                        )
                    }
                </table>
            </div>
        );
    }
}

User.propTypes = {
    userStore: PropTypes.object.isRequired,
    groups: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
    userStore: state.userReducer,
    groups: state.userReducer.groups
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({
        ...usersActionCreators,
        ...groupsActionCreators
    }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(User);

import React, {Component} from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';

import './index.scss';
import * as usersActionCreators from '../../actions/action_creators/users';
import * as groupsActionCreators from '../../actions/action_creators/groups';
import {handleChangeState, showForms, getValidOptions} from '../../services/formsOperations';
import searchOperation from '../../services/searchOperation';
import scrollPagination from '../../services/scrollPagination';
import redirectOnPage from '../../services/redirectOnPage';
import LoadingSpinner from '../../components/LoadingSpinner';
import SearchComponent from '../../components/SearchInput';
import showToastrMessage from "../../services/showToastrMessage";

class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showForm: false,
            username: '',
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            options: {
                limit: 10,
                loadNext: 10,
                searchBy: '',
                id: this.props.match.params.id
            },
            isLoadMore: true
        };

        this.loadMore = this.loadMore.bind(this);
        this.handleChangeState = handleChangeState.bind(this);
        this.showForms = showForms.bind(this, this.state.options.id);
        this.goToGroup = this.goToGroup.bind(this);
        this.searchGroups = this.searchGroups.bind(this);
        this.updateUser = this.updateUser.bind(this);
        this.startJoiningGroup = this.startJoiningGroup.bind(this);
        this.joinGroup = this.joinGroup.bind(this);
        this.leaveGroup = this.leaveGroup.bind(this);
    }

    componentDidMount() {
        const isJoiningGroup = false;
        this.props.actions.startJoiningGroup(isJoiningGroup);
        this.props.actions.getUserRequest(this.state.options);
        window.addEventListener('scroll', this.loadMore);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.loadMore);
    }

    componentWillReceiveProps(nextProps) {
        const error = nextProps.user.error || nextProps.updatedUser.error || nextProps.userJoinedGroup.error || nextProps.userLeftGroup.error;

        showToastrMessage.compareActions(nextProps.updatedUser, this.props.updatedUser, 'User is updated');
        showToastrMessage.compareActions(nextProps.userLeftGroup, this.props.userLeftGroup, 'User left group');
        error && showToastrMessage.error(error);
    }

    componentDidUpdate(prevProps) {
        const currentCountUsers = this.props.groups.length;
        const prevCountUsers = prevProps.groups.length;
        scrollPagination.checkRemovedItems.call(this, prevCountUsers, currentCountUsers);
    }

    loadMore() {
        const lengthOfGroups = this.props.groups.length;
        const {getUserRequest} = this.props.actions;
        scrollPagination.loadMore.call(this, lengthOfGroups, getUserRequest);
    }

    goToGroup(id) {
        redirectOnPage.path(`/groups/${id}`);
    };

    searchGroups(event) {
        const {getUserRequest} = this.props.actions;
        searchOperation.getItems.call(this, event, getUserRequest);
    };

    updateUser(event) {
        event.preventDefault();
        this.setState({showForm: false});
        const options = getValidOptions(this.state);
        this.props.actions.updateUserRequest(options);
    };

    startJoiningGroup(event) {
        event.stopPropagation();
        const isJoiningGroup = true;
        this.props.actions.startJoiningGroup(isJoiningGroup);
        redirectOnPage.path('/groups');
    };

    joinGroup(id, event) {
        event.stopPropagation();
        const options = {
            userID: this.state.options.id,
            groupID: id
        };
        this.props.actions.joinGroup(options);
    };

    leaveGroup(id, event) {
        event.stopPropagation();
        const options = {
            userID: this.state.options.id,
            groupID: id
        };
        this.props.actions.leaveGroupRequest(options);
    };

    render() {
        const {username, firstName, lastName, email} = this.props.user.data;
        const {groups, loading} = this.props;
        const {showForm, ...state} = this.state;

        const hiddenForm = classNames({'user--hide': !showForm});
        const shownForm = classNames('user--margin-right btn btn-outline-primary', {'user--hide': showForm});
        const isGroups = classNames({'user--hide': !groups.length && !state.options.searchBy});

        return (
            <div className='user'>
                <h1>USER</h1>
                <div className='user__info'>
                    <div className='user--margin-right'>
                        <h3>username: {username}</h3>
                        <input onChange={this.handleChangeState} value={state.username} className={classNames('form-control', hiddenForm)} name='username' type="text"/>
                        <h3>firstName: {firstName}</h3>
                        <input onChange={this.handleChangeState} value={state.firstName} className={classNames('form-control', hiddenForm)} name='firstName' type="text"/>
                        <h3>lastName: {lastName}</h3>
                        <input onChange={this.handleChangeState} value={state.lastName} className={classNames('form-control', hiddenForm)} name='lastName' type="text"/>
                        <h3>email: {email}</h3>
                        <input onChange={this.handleChangeState} value={state.email} className={classNames('form-control', hiddenForm)} name='email' type="text"/>
                        <h3>password: ****</h3>
                        <input onChange={this.handleChangeState} value={state.password} className={classNames('form-control', hiddenForm)} name='password' type="password"/>
                    </div>
                    <button onClick={this.showForms} className={shownForm}>Update</button>
                    <button onClick={this.updateUser} className={classNames('user--margin-right btn btn-outline-primary', hiddenForm)}>Save</button>
                    <button onClick={this.startJoiningGroup} className='btn btn-outline-info'>Join group</button>
                </div>

                <h1 className={isGroups}>Groups</h1>
                <div className={classNames('user__groups-table', isGroups)}>
                    <SearchComponent search={this.searchGroups}/>
                    <table className='table table-hover'>
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
                                <tbody key={index}>
                                <tr onClick={() => this.goToGroup(group._id)} className={classNames('user__groups-list', {'user--light-grey': group.isLeftGroup})}>
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
                                        <button onClick={(event) => this.leaveGroup(group._id, event)} className={classNames('user__leave-group btn btn-outline-danger', {'user--hide': group.isLeftGroup})}>leave group</button>
                                        <button onClick={(event) => this.joinGroup(group._id, event)} className={classNames('user__leave-group btn btn-outline-info', {'user--hide': !group.isLeftGroup})}>join group</button>
                                    </td>
                                </tr>
                                </tbody>
                            )
                        }
                    </table>
                </div>
                <LoadingSpinner loading={loading}/>
            </div>
        );
    }
}

User.defaultProps = {
    user: {},
    groups: [],
    updatedUser: {},
    userJoinedGroup: {},
    userLeftGroup: {},
    loading: false
};

User.propTypes = {
    user: PropTypes.object.isRequired,
    groups: PropTypes.array.isRequired,
    updatedUser: PropTypes.object.isRequired,
    userLeftGroup: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
    user: state.Users.user,
    groups: state.Users.user.data.groups,
    updatedUser: state.Users.updatedUser,
    userLeftGroup: state.Users.userLeftGroup,
    loading: state.Users.user.loading || state.Users.updatedUser.loading || state.Users.userJoinedGroup.loading || state.Users.userLeftGroup.loading
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({
        ...usersActionCreators,
        ...groupsActionCreators
    }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(User);

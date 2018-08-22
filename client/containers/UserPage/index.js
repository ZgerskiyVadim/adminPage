import React, {Component} from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';

import './index.scss';
import * as usersActionCreators from '../../actions/action_creators/users';
import * as groupsActionCreators from '../../actions/action_creators/groups';
import formsOperations from '../../services/formsOperations';
import searchOperation from '../../services/searchOperation';
import scrollPagination from '../../services/scrollPagination';
import redirectOnPage from '../../services/redirectOnPage';
import LoadingSpinner from '../../components/LoadingSpinner';
import SearchComponent from '../../components/SearchInput';
import showToastrMessage from "../../services/showToastrMessage";
import isEqual from "lodash.isequal";
import localStorageOperations from "../../services/localStorageOperations";

export class UserPage extends Component {
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
        this.handleChange = formsOperations.handleChange.bind(this);
        this.showForms = this.showForms.bind(this);
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
        const {searchBy, limit, id} = this.state.options;
        const options = {searchBy, limit, id};
        this.props.actions.getUserRequest(options);
        window.addEventListener('scroll', this.loadMore);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.loadMore);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.user !== nextProps.user && nextProps.user.data.username) {
            const {username, firstName, lastName, email} = nextProps.user.data;
            this.setState({
                username,
                firstName,
                lastName,
                email
            })
        }
        const error = nextProps.user.error || nextProps.updatedUser.error || nextProps.userJoinedGroup.error || nextProps.userLeftGroup.error;

        if (!isEqual(this.props.updatedUser.data, nextProps.updatedUser.data)) {
            const loggedUser = localStorageOperations.getItem('user');
            loggedUser && nextProps.updatedUser.data._id === loggedUser._id && localStorageOperations.setItem('user', nextProps.updatedUser.data);
            showToastrMessage.success('User is updated');
        }
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

    showForms() {
        this.setState({
            showForm: true
        });
    }

    updateUser(event) {
        event.preventDefault();
        this.setState({showForm: false},
            () => {
                const options = formsOperations.getValidOptions(this.state);
                this.props.actions.updateUserRequest(options);
            });
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
        const {options, showForm, ...state} = this.state;

        const hiddenForm = classNames({'user--hide': !showForm});
        const shownForm = classNames('user--margin-right btn btn-outline-primary', {'user--hide': showForm});
        const isGroups = classNames({'user--hide': !groups.length && !options.searchBy});

        return (
            <div className='user'>
                <h3 className='user-header'>USER</h3>
                <form className='user__info'>
                    <div className='user__info__forms user--margin-right'>
                        <label htmlFor='user-username'>Username: <span>{username}</span></label>
                        <input onChange={this.handleChange} value={state.username} className={classNames('form-control', hiddenForm)} name='username' id='user-username' type="text"/>
                        <label htmlFor='user-firstName'>FirstName: <span>{firstName}</span></label>
                        <input onChange={this.handleChange} value={state.firstName} className={classNames('form-control', hiddenForm)} name='firstName' id='user-firstName' type="text"/>
                        <label htmlFor='user-lastName'>LastName: <span>{lastName}</span></label>
                        <input onChange={this.handleChange} value={state.lastName} className={classNames('form-control', hiddenForm)} name='lastName' id='user-lastName' type="text"/>
                        <label htmlFor='user-email'>Email: <span>{email}</span></label>
                        <input onChange={this.handleChange} value={state.email} className={classNames('form-control', hiddenForm)} name='email' id='user-email' type="text"/>
                        <label htmlFor='user-password'>Password: <span>****</span></label>
                        <input onChange={this.handleChange} value={state.password} className={classNames('form-control', hiddenForm)} name='password' id='user-password' type="password"/>
                    </div>
                    <div className='user__info__buttons'>
                        <button onClick={this.showForms} className={shownForm} type='button'>Update</button>
                        <button onClick={this.updateUser} className={classNames('user--margin-right btn btn-outline-primary', hiddenForm)} type="submit">Save</button>
                        <button onClick={this.startJoiningGroup} className='btn btn-outline-info' type='button'>Join group</button>
                    </div>
                </form>

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
                                    <td className='buttons-field'>
                                        <button onClick={(event) => this.leaveGroup(group._id, event)} className={classNames('user__leave-group btn btn-outline-danger', {'user--hide': group.isLeftGroup})} type='button'>leave group</button>
                                        <button onClick={(event) => this.joinGroup(group._id, event)} className={classNames('user__join-group btn btn-outline-info', {'user--hide': !group.isLeftGroup})} type='button'>join group</button>
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

UserPage.defaultProps = {
    user: {},
    groups: [],
    updatedUser: {},
    userJoinedGroup: {},
    userLeftGroup: {},
    loading: false
};

UserPage.propTypes = {
    user: PropTypes.object.isRequired,
    groups: PropTypes.array.isRequired,
    updatedUser: PropTypes.object.isRequired,
    userJoinedGroup: PropTypes.object.isRequired,
    userLeftGroup: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
    user: state.Users.user,
    groups: state.Users.user.data.groups,
    updatedUser: state.Users.updatedUser,
    userJoinedGroup: state.Users.userJoinedGroup,
    userLeftGroup: state.Users.userLeftGroup,
    loading: state.Users.user.loading || state.Users.updatedUser.loading || state.Users.userJoinedGroup.loading || state.Users.userLeftGroup.loading
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({
        ...usersActionCreators,
        ...groupsActionCreators
    }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);

import React, {Component} from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';

import './index.scss';
import * as usersActionCreators from '../../actions/action_creators/users';
import scrollPagination from '../../services/scrollPagination';
import searchOperation from '../../services/searchOperation';
import User from '../../components/UserItem/index';
import LoadingSpinner from '../../components/LoadingSpinner';
import ModalWindow from '../../components/ModalWindow';
import SearchComponent from '../../components/SearchInput';
import showToastrMessage from "../../services/showToastrMessage";
import localStorageOperations from "../../services/localStorageOperations";
import redirectOnPage from "../../services/redirectOnPage";
import isEqual from "lodash.isequal";

export class UsersTablePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            options: {
                limit: 20,
                loadNext: 10,
                searchBy: ''
            },
            isLoadMore: true,
            showModal: false,
            userID: ''
        };

        this.loadMore = this.loadMore.bind(this);
        this.searchUsers = this.searchUsers.bind(this);
        this.updateUser = this.updateUser.bind(this);
        this.remove = this.remove.bind(this);
        this.showModal = this.showModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.goToCreateUserPage = this.goToCreateUserPage.bind(this);
    }

    loadMore() {
        const lengthOfUsers = this.props.users.data.length;
        const {getUsersRequest} = this.props.actions;

        scrollPagination.loadMore.call(this, lengthOfUsers, getUsersRequest);
    }

    componentDidMount() {
        const {searchBy, limit} = this.state.options;
        const options = {searchBy, limit};

        this.props.actions.getUsersRequest(options);
        window.addEventListener('scroll', this.loadMore)
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.loadMore);
    }

    componentWillReceiveProps(nextProps) {
        const error = nextProps.users.error || nextProps.updatedUser.error || nextProps.removedUser.error;

        error && showToastrMessage.error(error);
        !isEqual(this.props.updatedUser.data, nextProps.updatedUser.data) && showToastrMessage.success('User is updated');
        if (!isEqual(this.props.removedUser.data, nextProps.removedUser.data)) {
            const countOfUsers = nextProps.users.data.length;
            this.setState({
                options: {
                    ...this.state.options,
                    limit: countOfUsers
                }
            });
            showToastrMessage.success('User is removed');
        }
    }

    getUsers() {
        const loggedUserID = localStorageOperations.getItem('userID');

        if (this.props.isJoiningGroup) {
            return this.props.users.data.map(user => (user._id === this.props.user.data._id) || (loggedUserID && user._id === loggedUserID)
                ? {...user, hideRemoveButton: true}  //Hide remove button for joining user in groups and logged user
                : {...user, hideRemoveButton: false});
        } else {
            return this.props.users.data.map(user => (loggedUserID && user._id ===  loggedUserID)
                ? {...user, hideRemoveButton: true}  //Hide remove button for logged user
                : {...user, hideRemoveButton: false});
        }
    }

    searchUsers(event) {
        const {getUsersRequest} = this.props.actions;

        searchOperation.getItems.call(this, event, getUsersRequest);
    };

    updateUser(options) {
        this.props.actions.updateUserRequest(options);
    };

    remove(id) {
        this.props.actions.removeUserRequest(id);
    };

    showModal(id, event) {
        event.stopPropagation();
        this.setState({
            showModal: true,
            userID: id
        })
    };

    closeModal() {
        this.setState({
            showModal: false
        })
    };

    goToCreateUserPage() {
        redirectOnPage.path('create-user');
    }

    render() {
        const {showModal, userID} = this.state;
        const {loading} = this.props;

        return (
            <div className='users'>
                <button onClick={this.goToCreateUserPage} className='users__create-user btn btn-outline-primary'>Add new +</button>
                <SearchComponent search={this.searchUsers}/>
                <table className='users__table table table-hover'>
                    <thead className='thead-dark'>
                    <tr>
                        <th>
                            <span>#</span>
                        </th>
                        <th>
                            <span>Username</span>
                        </th>
                        <th>
                            <span>FirstName</span>
                        </th>
                        <th>
                            <span>LastName</span>
                        </th>
                        <th>
                            <span>Email</span>
                        </th>
                        <th>
                            <span>Password</span>
                        </th>
                        <th/>
                    </tr>
                    </thead>
                    {
                        this.getUsers().map((user, index) =>
                            <User
                                user={user}
                                index={index}
                                key={user._id}
                                hideRemoveButton={user.hideRemoveButton}
                                update={this.updateUser}
                                showModal={this.showModal}
                            />)
                    }
                </table>
                <LoadingSpinner loading={loading}/>
                <ModalWindow
                    showModal={showModal}
                    remove={() => this.remove(userID)}
                    closeModal={this.closeModal}
                />
            </div>
        );
    }
}

UsersTablePage.defaultProps = {
    users: {},
    updatedUser: {},
    removedUser: {},
    user: {},
    isJoiningGroup: false,
    loading: false
};

UsersTablePage.propTypes = {
    users: PropTypes.object.isRequired,
    updatedUser: PropTypes.object.isRequired,
    removedUser: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    isJoiningGroup: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
    users: state.Users.users,
    updatedUser: state.Users.updatedUser,
    removedUser: state.Users.removedUser,
    user: state.Users.user,
    loggedUser: state.Users.loggedUser,
    isJoiningGroup: state.Users.user.isJoiningGroup,
    loading: state.Users.users.loading || state.Users.updatedUser.loading || state.Users.removedUser.loading
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({
        ...usersActionCreators
    }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(UsersTablePage);

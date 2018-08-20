import React, {Component} from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';

import './index.scss';
import * as usersActionCreators from '../../actions/action_creators/users';
import scrollPagination from '../../services/scrollPagination';
import searchOperation from '../../services/searchOperation';
import User from '../../components/UserItem/user';
import LoadingSpinner from '../../components/LoadingSpinner';
import ModalWindow from '../../components/ModalWindow';
import SearchComponent from '../../components/SearchInput';
import showToastrMessage from "../../services/showToastrMessage";
import redirectOnPage from "../../services/redirectOnPage";
import {isEqualProps} from "../../services/isEqualProps";

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

        !isEqualProps(this.props.updatedUser.data, nextProps.updatedUser.data) && showToastrMessage.success('User is updated');
        !isEqualProps(this.props.removedUser.data, nextProps.removedUser.data) && showToastrMessage.success('User is removed');
        error && showToastrMessage.error(error);
    }

    componentDidUpdate(prevProps) {
        const currentCountUsers = this.props.users.data.length;
        const prevCountUsers = prevProps.users.data.length;
        scrollPagination.checkRemovedItems.call(this, prevCountUsers, currentCountUsers);
    }

    getUsers() {
        if (this.props.isJoiningGroup) {
            return this.props.users.data.map(user => user._id === this.props.user.data._id ? {...user, isJoining: true} : {...user, isJoining: false}); //Hide remove button for joining user
        } else {
            return this.props.users.data;
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
        const {isLoadMore, showModal, userID} = this.state;
        const {loading} = this.props;
        const marginBottom = classNames({'users--margin-bottom': !isLoadMore});

        return (
            <div className='users'>
                <button onClick={this.goToCreateUserPage} className='users__create-user btn btn-outline-primary'>Add new +</button>
                <SearchComponent search={this.searchUsers}/>
                <table className={classNames('users__table table table-hover', marginBottom)}>
                    <thead className='thead-dark'>
                    <tr>
                        <th>
                            <h5>#</h5>
                        </th>
                        <th>
                            <h5>username</h5>
                        </th>
                        <th>
                            <h5>firstName</h5>
                        </th>
                        <th>
                            <h5>lastName</h5>
                        </th>
                        <th>
                            <h5>email</h5>
                        </th>
                        <th>
                            <h5>password</h5>
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
                                isJoining={user.isJoining}
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
    isJoiningGroup: state.Users.user.isJoiningGroup,
    loading: state.Users.users.loading || state.Users.updatedUser.loading || state.Users.removedUser.loading
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({
        ...usersActionCreators
    }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(UsersTablePage);

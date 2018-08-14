import React, {Component} from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';

import './index.scss';
import * as usersActionCreators from '../../actions/action_creators/users';
import scrollPagination from '../../services/scrollPagination';
import searchOperation from '../../services/searchOperation';
import User from '../../components/userItem/user';
import LoadingSpinner from '../../components/loadingSpinner';
import ModalWindow from '../../components/modalWindow';
import SearchComponent from '../../components/search';
import showToastrMessage from "../../services/showToastrMessage";

class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {
            options: {
                limit: 20,
                loadNext: 10,
                searchBy: ''
            },
            isLoadMore: true,
            loading: false,
            showModal: false,
            userID: ''
        };

        this.loadMore = this.loadMore.bind(this);
        this.search = this.search.bind(this);
        this.update = this.update.bind(this);
        this.remove = this.remove.bind(this);
        this.showModal = this.showModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
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
        const loading = nextProps.users.loading || nextProps.updatedUser.loading || nextProps.removedUser.loading;
        const error = nextProps.users.error || nextProps.updatedUser.error || nextProps.removedUser.error;
        this.setState({
            loading
        });

        error && showToastrMessage.error(error);
        // toastrMessages(nextProps.usersStore);
    }

    componentDidUpdate(prevProps) {
        const currentCountUsers = this.props.users.data.length;
        const prevCountUsers = prevProps.users.data.length;
        scrollPagination.checkRemovedItems.call(this, prevCountUsers, currentCountUsers);
    }

    getUsers() {
        if (this.props.isJoiningGroup) {
            return this.props.users.data.map(user => user._id === this.props.user._id ? {...user, isJoining: true} : user); //Hide remove button for joining user
        } else {
            return this.props.users.data;
        }
    }

    search(event) {
        const {getUsersRequest} = this.props.actions;
        searchOperation.getItems.call(this, event, getUsersRequest);
    };

    update(options) {
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

    render() {
        const {isLoadMore, loading, showModal, userID} = this.state;
        const marginBottom = classNames({'users--margin-bottom': !isLoadMore});

        return (
            <div className='users'>
                <SearchComponent search={this.search}/>
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
                                update={this.update}
                                showModal={this.showModal}
                            />)
                    }
                </table>
                <LoadingSpinner loading={loading}/>
                <ModalWindow
                    isShow={showModal}
                    remove={() => this.remove(userID)}
                    closeModal={this.closeModal}
                />
            </div>
        );
    }
}

Users.propTypes = {
    users: PropTypes.object.isRequired,
    updatedUser: PropTypes.object.isRequired,
    removedUser: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    isJoiningGroup: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
    users: state.Users.users,
    updatedUser: state.Users.updatedUser,
    removedUser: state.Users.removedUser,
    user: state.User.user,
    isJoiningGroup: state.User.user.isJoiningGroup
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({
        ...usersActionCreators
    }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Users);

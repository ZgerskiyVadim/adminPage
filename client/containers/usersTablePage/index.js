import React, {Component} from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';

import './index.scss';
import * as usersActionCreators from '../../actions/action_creators/users';
import {loadMore, checkRemovedItems} from '../../services/loadMore';
import {searchUsersRequest} from '../../services/searchOperation';
import {toastrMessages} from '../../services/toastrMessages';
import User from '../../components/user-item/user';
import LoadingSpinner from '../../components/loadingSpinner';
import ModalWindow from '../../components/modalWindow';
import SearchComponent from '../../components/search';

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
            isLoading: false,
            showModal: false,
            userID: ''
        };
        this.loadMore = loadMore.bind(this, 'users');
    }

    componentDidMount() {
        const limit = this.state.options.limit;
        this.props.actions.getUsersRequest(limit);
        window.addEventListener('scroll', this.loadMore)
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.loadMore);
    }

    componentWillReceiveProps(nextProps) {
        const {isLoading} = nextProps.usersStore;
        this.setState({
            isLoading
        });

        toastrMessages(nextProps.usersStore);
    }

    componentDidUpdate(prevProps) {
        const currentCountUsers = this.props.users.length;
        const prevCountUsers = prevProps.users.length;
        checkRemovedItems.call(this, prevCountUsers, currentCountUsers);
    }

    getUsers() {
        if (this.props.isJoiningGroup) {
            return this.props.users.map(user => user._id === this.props.user._id ? {...user, isJoining: true} : user); //Hide remove button for joining user
        } else {
            return this.props.users;
        }
    }

    search = (event) => {
        searchUsersRequest.call(this, event);
    };

    update = (options) => {
        this.props.actions.updateUserRequest(options);
    };

    remove = (id) => (e) => {
        this.props.actions.removeUserRequest(id);
    };

    showModal = (id, e) => {
        e.stopPropagation();
        this.setState({
            showModal: true,
            userID: id
        })
    };

    closeModal = () => {
        this.setState({
            showModal: false
        })
    };

    render() {
        const {isLoadMore, isLoading, showModal, userID} = this.state;
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
                        <th/>
                    </tr>
                    </thead>
                    {
                        this.getUsers().map((user, index) =>
                            <User
                                user={user}
                                index={index}
                                history={this.props.history}
                                key={user._id}
                                isJoining={user.isJoining}
                                update={this.update}
                                showModal={this.showModal}
                            />)
                    }
                </table>
                <LoadingSpinner isLoading={isLoading}/>
                <ModalWindow
                    isShow={showModal}
                    remove={this.remove(userID)}
                    closeModal={this.closeModal}
                />
            </div>
        );
    }
}

Users.propTypes = {
    usersStore: PropTypes.object.isRequired,
    users: PropTypes.array.isRequired,
    user: PropTypes.object.isRequired,
    isJoiningGroup: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
    usersStore: state.usersReducer,
    users: state.usersReducer.users,
    user: state.userReducer.user,
    isJoiningGroup: state.userReducer.user.isJoiningGroup
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({
        ...usersActionCreators
    }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Users);

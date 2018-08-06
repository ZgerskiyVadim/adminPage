import React, {Component} from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import toastr from 'toastr';

import './index.scss';
import * as usersActionCreators from '../../actions/action_creators/users';
import {loadMore, checkRemovedItems} from '../../services/loadMore';
import {searchUsersRequest} from '../../services/searchOperation';
import {getErrorMessage} from '../../services/getErrorMessage';
import User from '../../components/user-item/user';
import LoadingSpinner from '../../components/loadingSpinner';

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
            isLoading: false
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
        const {error, isLoading, isUpdated, isRemoved} = nextProps.usersStore;
        const errorMessage = getErrorMessage(nextProps.usersStore);
        this.setState({
            isLoading
        });
        
        error && toastr.error(errorMessage, 'Opps!');
        isUpdated && toastr.success('User updated', 'Ok!');
        isRemoved && toastr.info('User deleted', 'Ok!');
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
        e.stopPropagation();
        this.props.actions.removeUserRequest(id);
    };

    render() {
        const {isLoadMore, isLoading} = this.state;
        const marginBottom = classNames({'users--margin-bottom': !isLoadMore});

        return (
            <div className='users'>
                <div className='users__search'>
                    <h2>Search</h2>
                    <input onChange={this.search} className='form-control col-md-3' type="text"/>
                </div>
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
                                remove={this.remove}
                            />)
                    }
                </table>
                <LoadingSpinner isLoading={isLoading}/>
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

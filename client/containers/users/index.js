import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import toastr from 'toastr';

import './index.scss';
import User from '../../components/user/user';
import {loadMore, checkRemovedItems} from '../../services/loadMore';
import * as usersActionCreators from '../../actions/action_creators/users';
import {searchRequest} from '../../services/searchOperation';

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
            isMounted: false
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
        const errorMessage = nextProps.usersStore.error && (nextProps.usersStore.error.response.data.message || nextProps.usersStore.error.message);
        nextProps.usersStore.error && toastr.error(errorMessage, 'Opps!');
        nextProps.usersStore.isUpdated && toastr.success('User updated', 'Ok!');
        nextProps.usersStore.isRemoved && toastr.info('User deleted', 'Ok!');
    }

    shouldComponentUpdate(nextProps) {
        const prevCountUsers = this.props.users.length;
        const nextCountUsers = nextProps.users.length;
        checkRemovedItems.call(this, prevCountUsers, nextCountUsers);
        return true;
    }

    getUsers() {
        if (this.props.user.joiningGroup) {
            return this.props.users.map(user => user._id === this.props.user.user._id ? {...user, isJoining: true} : user);
        } else {
            return this.props.users;
        }
    }

    search = (event) => {
        searchRequest.call(this, event, 'users');
    };

    update = (options) => {
        this.props.actions.updateUserRequest(options);
    };

    remove = (id) => (e) => {
        this.props.actions.removeUserRequest(id);
    };

    render() {
        const marginBottom = {marginBottom: this.state.isLoadMore ? '0' : '5em'};

        return (
            <div className='users'>
                <div className='users-search'>
                    <h2>Search</h2>
                    <input onChange={this.search} className='form-control col-md-3' type="text"/>
                </div>
                <div style={marginBottom}>
                    <div className='users-headers col-md-9'>
                        <h2 className='col-md-3'>username</h2>
                        <h2 className='col-md-3'>firstName</h2>
                        <h2 className='col-md-3'>lastName</h2>
                        <h2 className='col-md-3'>email</h2>
                    </div>
                    {
                        this.getUsers().map(user =>
                            <User
                                user={user}
                                key={user._id}
                                update={this.update}
                                remove={this.remove}
                            />)
                    }
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    usersStore: state.usersReducer,
    users: state.usersReducer.users,
    user: state.userReducer
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({
        ...usersActionCreators
    }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Users);

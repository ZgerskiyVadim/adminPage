import React, { Component } from 'react';
import { connect } from 'react-redux';
import './index.scss';
import User from './user';
import { loadMore } from '../../services/loadMore';
import { bindActionCreators } from 'redux';
import * as usersActionCreators from "../../actions/action_creators/users";

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
        this.props.actions.getUsersRequest(this.state.options.limit);
        window.addEventListener('scroll', this.loadMore)
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.loadMore);
    }

    hideCurrentUserJoiningGroup() {
        return this.props.users.filter(user => user._id !== this.props.user.user._id)
    }

    search = (event) => {
        this.setState({
            options: {
                ...this.state.options,
                limit: 20,
                searchBy: event.target.value
            },
            isSearching: !!event.target.value,
            isLoadMore: true
        },
            () => this.props.actions.searchUsersRequest(this.state.options)
        );
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
                        this.props.user.joiningGroup ?

                            this.hideCurrentUserJoiningGroup().map(user =>
                                <User
                                    user={user}
                                    key={user._id}
                                    update={this.update}
                                    remove={this.remove}
                                />) :

                            this.props.users.map(user =>
                                <User
                                    user={user}
                                    key={user._id}
                                    update={this.update}
                                    remove={this.remove}
                                />
                            )
                    }
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    users: state.usersReducer,
    user: state.userReducer
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({
        ...usersActionCreators
    }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Users)
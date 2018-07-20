import React, { Component } from 'react';
import { connect } from 'react-redux';
import './index.scss';
import * as actions from '../../actions/constants';
import User from './user';
import { loadMore, setOptions } from '../../services/loadMore';

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
        this.setOptions = setOptions.bind(this);
    }

    componentDidMount() {
        this.props.getUsers(this.state.options.limit);
        this.listenScroll();
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.loadMore);
    }

    listenScroll() {
        window.addEventListener('scroll', this.loadMore)
    }

    hideCurrentUserJoiningGroup() {
        return this.props.stateStore.usersReducer.filter(user => user._id !== this.props.stateStore.userReducer.user._id)
    }

    search(event) {
        const options = this.setOptions(event);
        this.props.search(options);
    }

    render() {
        const marginBottom = {marginBottom: this.state.isLoadMore ? '0' : '5em'};

        return (
            <div className='users'>
                <div className='users-search'>
                    <h2>Search</h2>
                    <input onChange={this.search.bind(this)} className='form-control col-md-3' type="text"/>
                </div>
                <div style={marginBottom}>
                    <div className='users-headers col-md-9'>
                        <h2 className='col-md-3'>username</h2>
                        <h2 className='col-md-3'>firstName</h2>
                        <h2 className='col-md-3'>lastName</h2>
                        <h2 className='col-md-3'>email</h2>
                    </div>
                    {
                        this.props.stateStore.userReducer.joiningGroup ?

                            this.hideCurrentUserJoiningGroup().map(user =>
                                <User user={user} key={user._id}/>) :

                            this.props.stateStore.usersReducer.map(user =>
                                <User user={user} key={user._id}/>
                            )
                    }
                </div>
            </div>
        );
    }
}

export default connect(
    state => ({
        stateStore: state
    }),
    dispatch => ({
        getUsers: (limit) => {
            dispatch({type: actions.GET_USERS_REQUEST, payload: limit});
        },
        search: (options) => {
            dispatch({type: actions.SEARCH_USERS_REQUEST, payload: options});
        },
    })
)(Users)
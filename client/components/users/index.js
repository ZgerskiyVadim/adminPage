import React, { Component } from 'react';
import { connect } from 'react-redux';
import './index.scss';
import * as actions from '../../actions/constants';
import User from './user';

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
        this.loadMore = this.loadMore.bind(this);
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

    loadMore() {
        if (this.state.isLoadMore && (window.scrollY === (window.document.body.scrollHeight - window.innerHeight))) {
            if (this.state.options.limit > this.props.stateStore.usersReducer.length) {
                this.setState({
                    isLoadMore: false
                })
            } else {
                this.setState({
                    options: {
                        ...this.state.options,
                        limit: this.state.options.limit + this.state.options.loadNext
                    }
                });
                this.state.isSearching ? this.props.search(this.state.options) : this.props.getUsers(this.state.options.limit)
            }
        }
    }

    hideCurrentUserJoiningGroup() {
        return this.props.stateStore.usersReducer.filter(user => user._id !== this.props.stateStore.userReducer.user._id)
    }

    search(event) {
        const options = this.setOptions(event);
        this.props.search(options);
    }

    setOptions(event) {
        this.setState({
            options: {
                ...this.state.options,
                limit: 20,
                searchBy: event.target.value
            },
            isSearching: !!event.target.value,
            isLoadMore: true
        });
        return {
            limit: 20,
            searchBy: event.target.value
        }
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
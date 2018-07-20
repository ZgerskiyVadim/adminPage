import React, { Component } from 'react';
import { connect } from 'react-redux';
import './index.scss';
import * as actions from '../../actions/constants';
import Group from './group';
import { loadMore, setOptions } from '../../services/loadMore';

class Groups extends Component {
    constructor(props) {
        super(props);
        this.state = {
            options: {
                limit: 20,
                loadNext: 10,
                searchBy: ''
            },
            isLoadMore: true,
            isSearching: false,
        };
        this.loadMore = loadMore.bind(this, 'groups');
        this.setOptions = setOptions.bind(this);
        this.search = this.search.bind(this)
    }

    componentDidMount() {
        this.props.getGroups(this.state.options.limit);
        this.listenScroll();
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.loadMore);
    }

    listenScroll() {
        window.addEventListener('scroll', this.loadMore)
    }

    search(event) {
        const options = this.setOptions(event);
        this.props.search(options);
    }

    cancelJoinGroup() {
        const isJoining = false;
        this.props.cancelJoinGroup(isJoining)
    }

    userNotJoinedGroups() {
        return this.props.stateStore.groupsReducer.filter(group => {
            for (let i = 0; i < group.users.length; i++ ) {
                const userID = group.users[i]._id ? group.users[i]._id : group.users[i];
                if (userID === this.props.stateStore.userReducer.user._id) {
                    return false;
                }
            }
            return true;
        })
    }

    render() {
        const isJoingingGroup = {display: this.props.stateStore.userReducer.joiningGroup ? 'block' : 'none'};
        const marginBottom = {marginBottom: this.state.isLoadMore ? '0' : '5em'};

        return (
            <div className='groups'>
                <div className='groups-search'>
                    <h2>Search</h2>
                    <input onChange={this.search} className='form-control col-md-3' type="text"/>
                    <button onClick={this.cancelJoinGroup.bind(this)} style={isJoingingGroup} className='btn btn-outline-danger'>Cancel join group</button>
                </div>
                <div style={marginBottom}>
                    <div className='groups-headers col-md-4'>
                        <h2 className='col-md-6'>name</h2>
                        <h2 className='col-md-6'>title</h2>
                    </div>
                    {
                        this.props.stateStore.userReducer.joiningGroup ?

                            this.userNotJoinedGroups().map(group => <Group group={group} key={group._id}/>) :

                            this.props.stateStore.groupsReducer.map(group =>
                                <Group group={group} key={group._id}/>
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
        getGroups: (limit) => {
            dispatch({type: actions.GET_GROUPS_REQUEST, payload: limit});
        },
        search: (options) => {
            dispatch({type: actions.SEARCH_GROUPS_REQUEST, payload: options});
        },
        cancelJoinGroup: (isJoining) => {
            dispatch({type: actions.IS_JOINING_GROUP, payload: isJoining})
        },
    })
)(Groups)
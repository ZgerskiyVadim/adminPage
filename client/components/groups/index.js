import React, { Component } from 'react';
import { connect } from 'react-redux';
import './index.scss';
import Group from './group';
import * as actions from '../../actions/constants';

class Groups extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getGroups();
    }

    search(event) {
        this.props.search(event.target.value);
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

        return (
            <div className='groups'>
                <div className='groups-search'>
                    <h2>Search</h2>
                    <input onChange={this.search.bind(this)} className='form-control col-md-3' type="text"/>
                    <button onClick={this.cancelJoinGroup.bind(this)} style={isJoingingGroup} className='btn btn-outline-danger'>Cancel join group</button>
                </div>
                <div>
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
        getGroups: () => {
            dispatch({type: actions.GET_GROUPS_REQUEST});
        },
        search: (query) => {
            dispatch({type: actions.SEARCH_GROUPS_REQUEST, payload: query});
        },
        cancelJoinGroup: (isJoining) => {
            dispatch({type: actions.IS_JOINING_GROUP, payload: isJoining})
        },
    })
)(Groups)
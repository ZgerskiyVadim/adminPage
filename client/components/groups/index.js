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
        !this.props.stateStore.userReducer.joiningGroup && this.props.getGroups();
    }

    search(event) {
        this.props.search(event.target.value);
    }

    userNotJoinedGroups() {
        return this.props.stateStore.groupsReducer.filter(group => {
            for (let i = 0; i < group.users.length; i++ ) {
                const userID = group.users[i]._id ? group.users[i]._id : group.users[i];
                console.log('userID', userID);
                if (userID === this.props.stateStore.userReducer.user._id) {
                    return false;
                }
            }
            return true;
        })
    }

    render() {
        return (
            <div className='groups'>
                <h1>Search</h1>
                <input onChange={this.search.bind(this)} className='form-control col-md-4' type="text"/>
                <div>
                    <div className='groups-headers col-md-4'>
                        <h1 className='col-md-6'>name</h1>
                        <h1 className='col-md-6'>title</h1>
                    </div>
                    {
                        this.props.stateStore.userReducer.joiningGroup ?

                            this.userNotJoinedGroups().map(group =>{
                                console.log('WTF');
                                return <Group group={group} key={group._id}/>}) :

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
        }
    })
)(Groups)
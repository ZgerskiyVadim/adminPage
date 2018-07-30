import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import toastr from 'toastr';

import './index.scss';
import * as groupsActionCreators from '../../actions/action_creators/groups';
import {loadMore, checkRemovedItems} from '../../services/loadMore';
import {searchRequest} from '../../services/searchOperation';
import Group from '../../components/group/group';

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
            isSearching: false
        };
        this.loadMore = loadMore.bind(this, 'groups');
    }

    componentDidMount() {
        const limit = this.state.options.limit;
        this.props.actions.getGroupsRequest(limit);
        window.addEventListener('scroll', this.loadMore)
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.loadMore);
    }

    componentWillReceiveProps(nextProps) {
        const errorMessage = nextProps.groupsStore.error && (nextProps.groupsStore.error.response.data.message || nextProps.groupsStore.error.message);
        nextProps.groupsStore.error && toastr.error(errorMessage, 'Opps!');
        nextProps.groupsStore.isUpdated && toastr.success('Success!', 'Ok!');
        nextProps.groupsStore.isRemoved && toastr.info('Group deleted', 'Ok!');
    }

    componentDidUpdate(prevProps) {
        const nextCountGroups = this.props.groups.length;
        const prevCountGroups = prevProps.groups.length;
        checkRemovedItems.call(this, prevCountGroups, nextCountGroups);
    }

    isJoinedUserInGroup() {
        return this.props.groups.map(group => {
            for (let i = 0; i < group.users.length; i++ ) {
                const userID = group.users[i]._id ? group.users[i]._id : group.users[i];
                if (userID === this.props.user._id) {
                    return {
                        ...group,
                        isJoinedUserInGroup: true
                    };
                }
            }
            return {
                ...group,
                isJoinedUserInGroup: false
            };
        });
    }

    search = (event) => {
        searchRequest.call(this, event, 'groups');
    };

    joinGroup = (options) => {
        this.props.actions.joinGroup(options);
    };

    leaveGroup = (options) => {
        this.props.actions.removeUserRequest(options);
    };

    cancelJoinGroup = () => {
        const stopJoinGroups = false;
        this.props.actions.cancelJoinGroup(stopJoinGroups);
        this.props.history.push(`/users/${this.props.user._id}`);
    };

    update = (options) => {
        this.props.actions.updateGroupRequest(options);
    };

    remove = (id) => (e) => {
        this.props.actions.removeGroupRequest(id);
    };

    render() {
        const isJoiningGroup = {display: this.props.joiningGroup ? 'block' : 'none'};
        const marginBottom = {marginBottom: this.state.isLoadMore ? '0' : '5em'};

        return (
            <div className='groups'>
                <div className='groups-search'>
                    <h2>Search</h2>
                    <input onChange={this.search} className='form-control col-md-3' type="text"/>
                    <button onClick={this.cancelJoinGroup} style={isJoiningGroup} className='btn btn-outline-danger'>Cancel join group</button>
                </div>
                <div style={marginBottom}>
                    <div className='groups-headers col-md-8'>
                        <h2 className='col-md-4'>name</h2>
                        <h2 className='col-md-4'>title</h2>
                        <h2 className='groups--nowrap col-md-4'>users</h2>
                    </div>
                    {
                        this.props.joiningGroup ?

                            this.isJoinedUserInGroup().map(group =>
                                <Group
                                    key={group._id}
                                    group={group}
                                    userID={this.props.user._id}
                                    isJoinedUserInGroup={group.isJoinedUserInGroup}
                                    isJoiningGroup={true}
                                    joinGroup={this.joinGroup}
                                    update={this.update}
                                    remove={this.remove}
                                    leaveGroup={this.leaveGroup}
                                />) :

                            this.props.groups.map(group =>
                                <Group
                                    key={group._id}
                                    group={group}
                                    isJoiningGroup={false}
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
    groupsStore: state.groupsReducer,
    groups: state.groupsReducer.groups,
    user: state.userReducer.user,
    joiningGroup: state.userReducer.joiningGroup
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({
        ...groupsActionCreators
    }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Groups);

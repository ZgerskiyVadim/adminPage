import React, { Component } from 'react';
import { connect } from 'react-redux';
import './index.scss';
import { bindActionCreators } from 'redux';
import * as groupsActionCreators from '../../actions/action_creators/groups';
import { loadMore } from '../../services/loadMore';
import Group from './group';

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
        this.props.actions.getGroupsRequest(this.state.options.limit);
        window.addEventListener('scroll', this.loadMore)
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.loadMore);
    }

    getGroups() {
        if (this.props.user.joiningGroup) {
            return this.props.groups.map(group => {
                for (let i = 0; i < group.users.length; i++ ) {
                    const userID = group.users[i]._id ? group.users[i]._id : group.users[i];
                    if (userID === this.props.user.user._id) {
                        return {
                            ...group,
                            isJoiningUserInGroup: true
                        };
                    }
                }
                return {
                    ...group,
                    isJoiningUserInGroup: false
                };
            })
        } else {
            return this.props.groups;
        }
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
            () => this.props.actions.searchGroupsRequest(this.state.options)
        )
    };

    joinGroup = (options) => {
        this.props.actions.joinGroup(options);
    };

    cancelJoinGroup = () => {
        const isJoining = false;
        this.props.actions.cancelJoinGroup(isJoining);
        this.props.history.push(`/users/${this.props.user.user._id}`);
    };

    update = (options) => {
        this.props.actions.updateGroupRequest(options);
    };

    remove = (id) => (e) => {
        this.setState({
                options: {
                    ...this.state.options,
                    limit: this.state.options.limit - 1
                }
            }, () => {
            this.props.actions.removeGroupRequest(id);
            this.loadMore();
        })
    };

    leaveGroup = (options) => {
        this.props.actions.removeUserRequest(options);
    };

    render() {
        const isJoiningGroup = {display: this.props.user.joiningGroup ? 'block' : 'none'};
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
                        <h2 className='groups--nowrap col-md-4'>count of users</h2>
                    </div>
                    {
                        this.props.user.joiningGroup ?

                            this.getGroups().map((group, index) =>
                                <Group
                                    key={index}
                                    group={group}
                                    userID={this.props.user.user._id}
                                    isJoiningGroup={true}
                                    joinGroup={this.joinGroup}
                                    update={this.update}
                                    remove={this.remove}
                                    leaveGroup={this.leaveGroup}
                                />) :

                            this.getGroups().map((group, index) =>
                                <Group
                                    key={index}
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
    groups: state.groupsReducer,
    user: state.userReducer
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({
        ...groupsActionCreators
    }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Groups)
import React, {Component} from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import toastr from 'toastr';

import './index.scss';
import * as groupsActionCreators from '../../actions/action_creators/groups';
import {loadMore, checkRemovedItems} from '../../services/loadMore';
import {searchGroupsRequest} from '../../services/searchOperation';
import {getErrorMessage} from '../../services/getErrorMessage';
import Group from '../../components/group-item/group';

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
        const {error, isUpdated, isRemoved} = nextProps.groupsStore;
        const errorMessage = getErrorMessage(nextProps.groupsStore);

        error && toastr.error(errorMessage, 'Opps!');
        isUpdated && toastr.success('Success!', 'Ok!');
        isRemoved && toastr.info('Group deleted', 'Ok!');
    }

    componentDidUpdate(prevProps) {
        const currentCountGroups = this.props.groups.length;
        const prevCountGroups = prevProps.groups.length;
        checkRemovedItems.call(this, prevCountGroups, currentCountGroups);
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
        searchGroupsRequest.call(this, event);
    };

    joinGroup = (options) => {
        this.props.actions.joinGroup(options);
    };

    leaveGroup = (options) => {
        this.props.actions.removeUserRequest(options);
    };

    cancelJoinGroup = () => {
        const isJoiningGroups = false;
        this.props.actions.cancelJoinGroup(isJoiningGroups);
        this.props.history.push(`/users/${this.props.user._id}`);
    };

    update = (options) => {
        this.props.actions.updateGroupRequest(options);
    };

    remove = (id) => (e) => {
        this.props.actions.removeGroupRequest(id);
    };

    render() {
        const {isJoiningGroup, groups, user} = this.props;
        const {isLoadMore} = this.state;

        const isJoinGroup = classNames({'groups--hide': !isJoiningGroup});
        const marginBottom = classNames({'groups--margin-bottom': !isLoadMore});

        return (
            <div className='groups'>
                <div className='groups-search'>
                    <h2>Search</h2>
                    <input onChange={this.search} className='form-control col-md-3' type="text"/>
                    <button onClick={this.cancelJoinGroup} className={classNames('btn btn-outline-danger', isJoinGroup)}>Cancel join group</button>
                </div>
                <table className={classNames('groups-table table table-hover', marginBottom)}>
                    <thead className='thead-dark'>
                    <tr>
                        <th>
                            <h5>#</h5>
                        </th>
                        <th>
                            <h5>name</h5>
                        </th>
                        <th>
                            <h5>title</h5>
                        </th>
                        <th>
                            <h5>users</h5>
                        </th>
                        <th/>
                    </tr>
                    </thead>
                    {
                        isJoiningGroup ?

                            this.isJoinedUserInGroup().map((group, index) =>
                                <Group
                                    key={group._id}
                                    group={group}
                                    index={index}
                                    userID={user._id}
                                    history={this.props.history}
                                    isJoinedUserInGroup={group.isJoinedUserInGroup}
                                    isJoiningGroup={true}
                                    joinGroup={this.joinGroup}
                                    update={this.update}
                                    remove={this.remove}
                                    leaveGroup={this.leaveGroup}
                                />) :

                            groups.map((group, index) =>
                                <Group
                                    key={group._id}
                                    group={group}
                                    index={index}
                                    history={this.props.history}
                                    isJoiningGroup={false}
                                    update={this.update}
                                    remove={this.remove}
                                />)
                    }
                </table>
            </div>
        );
    }
}

Groups.propTypes = {
    groupsStore: PropTypes.object.isRequired,
    groups: PropTypes.array.isRequired,
    user: PropTypes.object.isRequired,
    isJoiningGroup: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
    groupsStore: state.groupsReducer,
    groups: state.groupsReducer.groups,
    user: state.userReducer.user,
    isJoiningGroup: state.userReducer.user.isJoiningGroup
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({
        ...groupsActionCreators
    }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Groups);

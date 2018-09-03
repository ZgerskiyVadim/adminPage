import React, {Component} from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';

import './index.scss';
import * as groupsActionCreators from '../../actions/action_creators/groups';
import * as usersActionCreators from '../../actions/action_creators/users';
import scrollPagination from '../../services/scrollPagination';
import searchOperation from '../../services/searchOperation';
import redirectOnPage from '../../services/redirectOnPage';
import Group from '../../components/GroupItem/index';
import LoadingSpinner from '../../components/LoadingSpinner';
import ModalWindow from '../../components/ModalWindow';
import SearchComponent from '../../components/SearchInput';
import showToastrMessage from "../../services/showToastrMessage";
import isEqual from "lodash.isequal";

export class GroupsTablePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            options: {
                limit: 20,
                loadNext: 10,
                searchBy: ''
            },
            isLoadMore: true,
            showModal: false,
            groupID: ''
        };

        this.loadMore = this.loadMore.bind(this);
        this.searchGroups = this.searchGroups.bind(this);
        this.joinGroup = this.joinGroup.bind(this);
        this.leaveGroup = this.leaveGroup.bind(this);
        this.cancelJoinGroup = this.cancelJoinGroup.bind(this);
        this.updateGroup = this.updateGroup.bind(this);
        this.remove = this.remove.bind(this);
        this.showModal = this.showModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.goToCreateGroupPage = this.goToCreateGroupPage.bind(this);
    }

    loadMore() {
        const lengthOfGroups = this.props.groups.data.length;
        const {getGroupsRequest} = this.props.actions;
        scrollPagination.loadMore.call(this, lengthOfGroups, getGroupsRequest);
    }

    componentDidMount() {
        const {searchBy, limit} = this.state.options;
        const options = {searchBy, limit};
        this.props.actions.getGroupsRequest(options);
        window.addEventListener('scroll', this.loadMore)
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.loadMore);
    }

    componentWillReceiveProps(nextProps) {
        const error = nextProps.groups.error || nextProps.updatedGroup.error || nextProps.removedGroup.error || nextProps.userJoinedGroup.error || nextProps.userLeftGroup.error;

        error && showToastrMessage.error(error);
        !isEqual(this.props.updatedGroup.data, nextProps.updatedGroup.data) && showToastrMessage.success();
        !isEqual(this.props.removedGroup.data, nextProps.removedGroup.data) && showToastrMessage.success('Group is removed');
    }

    componentDidUpdate(prevProps) {
        const currentCountGroups = this.props.groups.data.length;
        const prevCountGroups = prevProps.groups.data.length;
        if (currentCountGroups < prevCountGroups) {
            this.setState({
                options: {
                    ...this.state.options,
                    limit: currentCountGroups
                }
            });
        }
    }

    groupsShowIsUserJoined() {
        return this.props.groups.data.map(group => {
            for (let i = 0; i < group.users.length; i++ ) {
                const userID = group.users[i]._id;
                const joiningUserID = this.props.user.data._id;

                if (joiningUserID === userID) {
                    return {
                        ...group,
                        userJoinedGroup: true
                    };
                }
            }
            return {
                ...group,
                userJoinedGroup: false
            };
        });
    }

    searchGroups(event) {
        const {getGroupsRequest} = this.props.actions;
        searchOperation.getItems.call(this, event, getGroupsRequest);
    };

    joinGroup(options) {
        this.props.actions.joinGroup(options);
    };

    leaveGroup(options) {
        this.props.actions.leaveGroupRequest(options);
    };

    cancelJoinGroup() {
        const isJoiningGroups = false;
        this.props.actions.cancelJoinGroup(isJoiningGroups);
        redirectOnPage.path(`/users/${this.props.user.data._id}`);
    };

    updateGroup(options) {
        this.props.actions.updateGroupRequest(options);
    };

    remove(id) {
        this.props.actions.removeGroupRequest(id);
    };

    showModal(id, event) {
        event.stopPropagation();
        this.setState({
            showModal: true,
            groupID: id
        })
    };

    closeModal() {
        this.setState({
            showModal: false
        })
    };

    goToCreateGroupPage() {
        redirectOnPage.path('/create-group');
    }

    render() {
        const {isJoiningGroup, groups, user, loading} = this.props;
        const {isLoadMore, showModal, groupID} = this.state;

        const isJoinGroup = classNames({'groups--hide': !isJoiningGroup});
        const marginBottom = classNames({'groups--margin-bottom': !isLoadMore});

        return (
            <div className='groups'>
                <button onClick={this.goToCreateGroupPage} className='groups__create-group btn btn-outline-primary'>Add new +</button>
                <SearchComponent
                    search={this.searchGroups}
                    handleButtonClick={this.cancelJoinGroup}
                    style={classNames('btn btn-outline-danger', isJoinGroup)}
                />
                <table className={classNames('groups__table table table-hover', marginBottom)}>
                    <thead className='thead-dark'>
                    <tr>
                        <th>
                            <span>#</span>
                        </th>
                        <th>
                            <span>Name</span>
                        </th>
                        <th>
                            <span>Title</span>
                        </th>
                        <th>
                            <span>Users</span>
                        </th>
                        <th/>
                    </tr>
                    </thead>
                    {
                        isJoiningGroup ?

                            this.groupsShowIsUserJoined().map((group, index) =>
                                <Group
                                    key={group._id}
                                    group={group}
                                    index={index}
                                    userID={user.data._id}
                                    userJoinedGroup={group.userJoinedGroup}
                                    isJoiningGroup={true}
                                    joinGroup={this.joinGroup}
                                    leaveGroup={this.leaveGroup}
                                />) :

                            groups.data.map((group, index) =>
                                <Group
                                    key={group._id}
                                    group={group}
                                    index={index}
                                    isJoiningGroup={false}
                                    update={this.updateGroup}
                                    showModal={this.showModal}
                                />)
                    }
                </table>
                <LoadingSpinner loading={loading}/>
                <ModalWindow
                    showModal={showModal}
                    remove={() => this.remove(groupID)}
                    closeModal={this.closeModal}
                />
            </div>
        );
    }
}

GroupsTablePage.defaultProps = {
    groups: {},
    updatedGroup: {},
    removedGroup: {},
    user: {},
    userJoinedGroup: {},
    userLeftGroup: {},
    loading: false,
    isJoiningGroup: false
};

GroupsTablePage.propTypes = {
    groups: PropTypes.object.isRequired,
    updatedGroup: PropTypes.object.isRequired,
    removedGroup: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    isJoiningGroup: PropTypes.bool.isRequired,
    userJoinedGroup: PropTypes.object.isRequired,
    userLeftGroup: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
    groups: state.Groups.groups,
    updatedGroup: state.Groups.updatedGroup,
    removedGroup: state.Groups.removedGroup,
    user: state.Users.user,
    isJoiningGroup: state.Users.user.isJoiningGroup,
    userJoinedGroup: state.Users.userJoinedGroup,
    userLeftGroup: state.Users.userLeftGroup,
    loading: state.Groups.groups.loading || state.Groups.updatedGroup.loading || state.Groups.removedGroup.loading || state.Users.userJoinedGroup.loading || state.Users.userLeftGroup.loading
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({
        ...groupsActionCreators,
        ...usersActionCreators
    }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(GroupsTablePage);

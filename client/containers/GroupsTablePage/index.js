import React, {Component} from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';

import './index.scss';
import * as groupsActionCreators from '../../actions/action_creators/groups';
import scrollPagination from '../../services/scrollPagination';
import searchOperation from '../../services/searchOperation';
import redirectOnPage from '../../services/redirectOnPage';
import Group from '../../components/GroupItem/group';
import LoadingSpinner from '../../components/LoadingSpinner';
import ModalWindow from '../../components/ModalWindow';
import SearchComponent from '../../components/SearchInput';
import showToastrMessage from "../../services/showToastrMessage";

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
        const error = nextProps.groups.error || nextProps.updatedGroup.error || nextProps.removedGroup.error;

        error && showToastrMessage.error(error);
        // toastrMessages(nextProps.groupsStore);
    }

    componentDidUpdate(prevProps) {
        const currentCountUsers = this.props.groups.data.length;
        const prevCountUsers = prevProps.groups.data.length;
        scrollPagination.checkRemovedItems.call(this, prevCountUsers, currentCountUsers);
    }

    isJoinedUserInGroup() {
        return this.props.groups.data.map(group => {
            for (let i = 0; i < group.users.length; i++ ) {
                const userID = group.users[i]._id ? group.users[i]._id : group.users[i];
                if (userID === this.props.user.data._id) {
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

    searchGroups(event) {
        const {getGroupsRequest} = this.props.actions;
        searchOperation.getItems.call(this, event, getGroupsRequest);
    };

    joinGroup(options) {
        this.props.actions.joinGroup(options);
    };

    leaveGroup(options) {
        this.props.actions.removeUserRequest(options);
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

    render() {
        const {isJoiningGroup, groups, user, loading} = this.props;
        const {isLoadMore, showModal, groupID} = this.state;

        const isJoinGroup = classNames({'groups--hide': !isJoiningGroup});
        const marginBottom = classNames({'groups--margin-bottom': !isLoadMore});

        return (
            <div className='groups'>
                <SearchComponent
                    search={this.searchGroups}
                    handleButtonClick={this.cancelJoinGroup}
                    style={classNames('btn btn-outline-danger', isJoinGroup)}
                />
                <table className={classNames('groups__table table table-hover', marginBottom)}>
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
                                    userID={user.data._id}
                                    isJoinedUserInGroup={group.isJoinedUserInGroup}
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
                    isShow={showModal}
                    remove={() => this.remove(groupID)}
                    closeModal={this.closeModal}
                />
            </div>
        );
    }
}

Groups.defaultProps = {
    groups: {},
    updatedGroup: {},
    removedGroup: {},
    user: {},
    isJoiningGroup: false,
    loading: false
};

Groups.propTypes = {
    groups: PropTypes.object.isRequired,
    updatedGroup: PropTypes.object.isRequired,
    removedGroup: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    isJoiningGroup: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
    groups: state.Groups.groups,
    updatedGroup: state.Groups.updatedGroup,
    removedGroup: state.Groups.removedGroup,
    user: state.User.user,
    isJoiningGroup: state.User.user.isJoiningGroup,
    loading: state.Groups.groups.loading || state.Groups.updatedGroup.loading || state.Groups.removedGroup.loading
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({
        ...groupsActionCreators
    }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Groups);
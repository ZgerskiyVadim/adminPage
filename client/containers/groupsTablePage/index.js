import React, {Component} from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';

import './index.scss';
import * as groupsActionCreators from '../../actions/action_creators/groups';
import {checkRemovedItems, loadMore} from '../../services/loadMore';
import searchOperation from '../../services/searchOperation';
import redirectOnPage from '../../services/redirectOnPage';
import Group from '../../components/group-item/group';
import LoadingSpinner from '../../components/loadingSpinner';
import ModalWindow from '../../components/modalWindow';
import SearchComponent from '../../components/search';
import toastrShowMessage from "../../services/toastrShowMessage";

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
            loading: false,
            showModal: false,
            groupID: ''
        };

        this.loadMore = loadMore.bind(this, 'groups');
        this.search = this.search.bind(this);
        this.joinGroup = this.joinGroup.bind(this);
        this.leaveGroup = this.leaveGroup.bind(this);
        this.cancelJoinGroup = this.cancelJoinGroup.bind(this);
        this.update = this.update.bind(this);
        this.remove = this.remove.bind(this);
        this.showModal = this.showModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
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
        const loading = nextProps.groups.loading || nextProps.updatedGroup.loading || nextProps.removedGroup.loading;
        const error = nextProps.groups.error || nextProps.updatedGroup.error || nextProps.removedGroup.error;
        this.setState({
            loading
        });

        error && toastrShowMessage.error(error);
        // toastrMessages(nextProps.groupsStore);
    }

    componentDidUpdate(prevProps) {
        const currentCountUsers = this.props.groups.data.length;
        const prevCountUsers = prevProps.groups.data.length;
        checkRemovedItems.call(this, prevCountUsers, currentCountUsers);
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

    search(event) {
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

    update(options) {
        this.props.actions.updateGroupRequest(options);
    };

    remove(id) {
        this.props.actions.removeGroupRequest(id);
    };

    showModal(id, e) {
        e.stopPropagation();
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
        const {isJoiningGroup, groups, user} = this.props;
        const {isLoadMore, loading, showModal, groupID} = this.state;

        const isJoinGroup = classNames({'groups--hide': !isJoiningGroup});
        const marginBottom = classNames({'groups--margin-bottom': !isLoadMore});

        return (
            <div className='groups'>
                <SearchComponent
                    search={this.search}
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
                                    update={this.update}
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

Groups.propTypes = {
    groups: PropTypes.object.isRequired,
    updatedGroup: PropTypes.object.isRequired,
    removedGroup: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    isJoiningGroup: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
    groups: state.Groups.groups,
    updatedGroup: state.Groups.updatedGroup,
    removedGroup: state.Groups.removedGroup,
    user: state.User.user,
    isJoiningGroup: state.User.user.isJoiningGroup
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({
        ...groupsActionCreators
    }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Groups);

import React, {Component} from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';

import './index.scss';
import * as groupsActionCreators from '../../actions/action_creators/groups';
import {checkRemovedItems, loadMore} from '../../services/loadMore';
import {searchGroupsRequest} from '../../services/searchOperation';
import toastrMessage from '../../services/toastrMessages';
import Group from '../../components/group-item/group';
import LoadingSpinner from '../../components/loadingSpinner';
import ModalWindow from '../../components/modalWindow';
import SearchComponent from '../../components/search';

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
        const limit = this.state.options.limit;
        this.props.actions.getGroupsRequest(limit);
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

        toastrMessage.error(error);
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

    search(event) {
        searchGroupsRequest.call(this, event);
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
        this.props.history.push(`/users/${this.props.user._id}`);
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
                                    userID={user._id}
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

import React, { Component } from 'react';
import { connect } from 'react-redux';
import './index.scss';
import { bindActionCreators } from 'redux';
import * as groupsActionCreators from '../../actions/action_creators/groups';
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
        this.props.actions.getGroupsRequest(this.state.options.limit);
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
        this.props.actions.searchGroupsRequest(options);
    }

    cancelJoinGroup() {
        const isJoining = false;
        this.props.actions.cancelJoinGroup(isJoining);
        this.props.history.push(`/users/${this.props.user.user._id}`);
    }

    userNotJoinedGroups() {
        return this.props.groups.filter(group => {
            for (let i = 0; i < group.users.length; i++ ) {
                const userID = group.users[i]._id ? group.users[i]._id : group.users[i];
                if (userID === this.props.user.user._id) {
                    return false;
                }
            }
            return true;
        })
    }

    render() {
        const isJoingingGroup = {display: this.props.user.joiningGroup ? 'block' : 'none'};
        const marginBottom = {marginBottom: this.state.isLoadMore ? '0' : '5em'};

        return (
            <div className='groups'>
                <div className='groups-search'>
                    <h2>Search</h2>
                    <input onChange={this.search} className='form-control col-md-3' type="text"/>
                    <button onClick={this.cancelJoinGroup.bind(this)} style={isJoingingGroup} className='btn btn-outline-danger'>Cancel join group</button>
                </div>
                <div style={marginBottom}>
                    <div className='groups-headers col-md-8'>
                        <h2 className='col-md-4'>name</h2>
                        <h2 className='col-md-4'>title</h2>
                        <h2 className='groups--nowrap col-md-4'>count of users</h2>
                    </div>
                    {
                        this.props.user.joiningGroup ?

                            this.userNotJoinedGroups().map(group => <Group group={group} key={group._id}/>) :

                            this.props.groups.map(group =>
                                <Group group={group} key={group._id}/>
                            )
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
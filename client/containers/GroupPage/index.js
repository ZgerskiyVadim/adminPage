import React, {Component} from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';

import './index.scss';
import * as groupsActionCreators from '../../actions/action_creators/groups';
import formsOperations from '../../services/formsOperations';
import searchOperation from '../../services/searchOperation';
import scrollPagination from '../../services/scrollPagination';
import redirectOnPage from '../../services/redirectOnPage';
import LoadingSpinner from '../../components/LoadingSpinner';
import ModalWindow from '../../components/ModalWindow';
import SearchComponent from '../../components/SearchInput';
import showToastrMessage from "../../services/showToastrMessage";
import {isEqualProps} from "../../services/isEqualProps";

export class GroupPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showForm: false,
            name: '',
            title: '',
            options: {
                limit: 10,
                loadNext: 10,
                searchBy: '',
                id: this.props.match.params.id
            },
            isLoadMore: true,
            showModal: false,
            userID: ''
        };

        this.loadMore = this.loadMore.bind(this);
        this.showForms = this.showForms.bind(this);
        this.handleChange = formsOperations.handleChange.bind(this);
        this.goToUser = this.goToUser.bind(this);
        this.searchUsers = this.searchUsers.bind(this);
        this.updateGroup = this.updateGroup.bind(this);
        this.removeUser = this.removeUser.bind(this);
        this.showModal = this.showModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    componentDidMount() {
        this.props.actions.getGroupRequest(this.state.options);
        window.addEventListener('scroll', this.loadMore);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.loadMore);
    }

    componentWillReceiveProps(nextProps) {
        const error = nextProps.group.error || nextProps.updatedGroup.error;

        !isEqualProps(this.props.updatedGroup.data, nextProps.updatedGroup.data) && showToastrMessage.success();
        error && showToastrMessage.error(error);
    }

    componentDidUpdate(prevProps) {
        const currentCountUsers = this.props.users.length;
        const prevCountUsers = prevProps.users.length;
        scrollPagination.checkRemovedItems.call(this, prevCountUsers, currentCountUsers);
    }

    loadMore() {
        const lengthOfUsers = this.props.users.length;
        const {getGroupRequest} = this.props.actions;
        scrollPagination.loadMore.call(this, lengthOfUsers, getGroupRequest);
    }

    goToUser(id) {
        redirectOnPage.path(`/users/${id}`);
    };

    searchUsers(event) {
        const {getGroupRequest} = this.props.actions;
        searchOperation.getItems.call(this, event, getGroupRequest);
    };

    showForms(event) {
        event.stopPropagation();
        this.setState({
            showForm: true
        });
    }

    updateGroup(event) {
        event.preventDefault();
        this.setState({showForm: false}, () => {
            const options = formsOperations.getValidOptions(this.state);
            this.props.actions.updateGroupRequest(options);
        });
    };

    removeUser(id) {
        const options = {
            groupID: this.state.options.id,
            userID: id
        };
        this.props.actions.removeUserFromGroupRequest(options);
    };

    showModal(id, event) {
        event.stopPropagation();
        this.setState({
            showModal: true,
            userID: id
        })
    };

    closeModal() {
        this.setState({
            showModal: false
        })
    };

    render() {
        const {name, title} = this.props.group.data;
        const {users, loading} = this.props;
        const {options, showForm, ...state} = this.state;

        const hiddenForm = classNames({'group--hide': !showForm});
        const shownForm = classNames({'group--hide': showForm});
        const isUsers = classNames({'group--hide': !users.length && !options.searchBy});

        return (
            <div className='group'>
                <h3 className='group-header'>GROUP</h3>
                <div className='group__info'>
                    <div className='group--margin-right'>
                        <h4>name: <span>{name}</span></h4>
                        <input onChange={this.handleChange} value={state.name} className={classNames('form-control', hiddenForm)} name='name' type="text"/>
                        <h4>title: <span>{title}</span></h4>
                        <input onChange={this.handleChange} value={state.title} className={classNames('form-control', hiddenForm)} name='title' type="text"/>
                    </div>

                    <div className='group__info__buttons'>
                        <button onClick={this.showForms} className={classNames('btn btn-outline-primary', shownForm)}>Update</button>
                        <button onClick={this.updateGroup} className={classNames('btn btn-outline-primary', hiddenForm)}>Save</button>
                    </div>
                </div>

                <div className={classNames('group__users-table', isUsers)}>
                    <SearchComponent search={this.searchUsers}/>
                    <table className='table table-hover'>
                        <thead className='thead-dark'>
                        <tr>
                            <th>
                                <h5>#</h5>
                            </th>
                            <th>
                                <h5>username</h5>
                            </th>
                            <th>
                                <h5>firstName</h5>
                            </th>
                            <th>
                                <h5>lastName</h5>
                            </th>
                            <th>
                                <h5>email</h5>
                            </th>
                            <th/>
                        </tr>
                        </thead>
                        {
                            users.map((user, index) =>
                                <tbody key={index}>
                                <tr onClick={() => this.goToUser(user._id)} className='group__users-list'>
                                    <th>{index + 1}</th>
                                    <td>
                                        <h5>{user.username}</h5>
                                    </td>
                                    <td>
                                        <h5>{user.firstName}</h5>
                                    </td>
                                    <td>
                                        <h5>{user.lastName}</h5>
                                    </td>
                                    <td>
                                        <h5>{user.email}</h5>
                                    </td>
                                    <td className='buttons-field'>
                                        <button onClick={(event) => this.showModal(user._id, event)} className='group__remove-user btn btn-outline-danger'>remove user</button>
                                    </td>
                                </tr>
                                </tbody>
                            )
                        }
                    </table>
                </div>
                <LoadingSpinner loading={loading}/>
                <ModalWindow
                    showModal={state.showModal}
                    remove={() => this.removeUser(state.userID)}
                    closeModal={this.closeModal}
                />
            </div>
        );
    }
}

GroupPage.defaultProps = {
    group: {},
    updatedGroup: {},
    users: [],
    loading: false
};

GroupPage.propTypes = {
    group: PropTypes.object.isRequired,
    updatedGroup: PropTypes.object.isRequired,
    users: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
    group: state.Groups.group,
    updatedGroup: state.Groups.updatedGroup,
    users: state.Groups.group.data.users,
    loading: state.Groups.group.loading || state.Groups.updatedGroup.loading
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({
        ...groupsActionCreators
    }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(GroupPage);

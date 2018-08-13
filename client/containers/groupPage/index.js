import React, {Component} from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';

import './index.scss';
import * as groupsActionCreators from '../../actions/action_creators/groups';
import {handleChangeState, showForms, getValidOptions} from '../../services/formsOperations';
import {handleError} from '../../services/handleError';
import searchOperation from '../../services/searchOperation';
import {checkRemovedItems, loadMore} from '../../services/loadMore';
import redirectOnPage from '../../services/redirectOnPage';
import LoadingSpinner from '../../components/loadingSpinner';
import ModalWindow from '../../components/modalWindow';
import SearchComponent from '../../components/search';

class Group extends Component {
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
            loading: false,
            showModal: false,
            userID: ''
        };

        this.loadMore = loadMore.bind(this, 'group');
        this.showForms = showForms.bind(this, this.state.options.id);
        this.handleChangeState = handleChangeState.bind(this);
        this.goToUser = this.goToUser.bind(this);
        this.search = this.search.bind(this);
        this.update = this.update.bind(this);
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
        const loading = nextProps.group.loading || nextProps.updatedGroup.loading;
        const error = nextProps.group.error || nextProps.updatedGroup.error;
        this.setState({
            loading
        });

        handleError(error);
        // toastrMessages.call(this, nextProps.group);
    }

    componentDidUpdate(prevProps) {
        const currentCountUsers = this.props.users.length;
        const prevCountUsers = prevProps.users.length;
        checkRemovedItems.call(this, prevCountUsers, currentCountUsers);
    }

    goToUser(id) {
        redirectOnPage.path(`/users/${id}`);
    };

    search(event) {
        const {getGroupRequest} = this.props.actions;
        searchOperation.getItem.call(this, event, getGroupRequest);
    };

    update(e) {
        e.preventDefault();
        this.setState({showForm: false});
        const options = getValidOptions(this.state);
        this.props.actions.updateGroupRequest(options);
    };

    removeUser(id) {
        const options = {
            groupID: this.state.options.id,
            userID: id
        };
        this.props.actions.removeUserRequest(options);
    };

    showModal(id, e) {
        e.stopPropagation();
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
        const {users} = this.props;
        const {...state} = this.state;

        const hiddenForm = classNames({'group--hide': !state.showForm});
        const shownForm = classNames({'group--hide': state.showForm});
        const isUsers = classNames({'group--hide': !users.length && !state.options.searchBy});

        return (
            <div className='group'>
                <h1>GROUP</h1>
                <div className='group__info'>
                    <div className='group--margin-right'>
                        <h3>name: {name}</h3>
                        <input onChange={this.handleChangeState} value={state.name} className={classNames('form-control', hiddenForm)} name='name' type="text"/>
                        <h3>title: {title}</h3>
                        <input onChange={this.handleChangeState} value={state.title} className={classNames('form-control', hiddenForm)} name='title' type="text"/>
                    </div>

                    <button onClick={this.showForms} className={classNames('btn btn-outline-primary', shownForm)}>Update</button>
                    <button onClick={this.update} className={classNames('btn btn-outline-primary', hiddenForm)}>Save</button>
                </div>

                <h1 className={isUsers}>Users</h1>
                <div className={classNames('group__users-table', isUsers)}>
                    <SearchComponent search={this.search}/>
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
                                    <td>
                                        <button onClick={(e) => this.showModal(user._id, e)} className='group__remove-user btn btn-outline-danger'>remove user</button>
                                    </td>
                                </tr>
                                </tbody>
                            )
                        }
                    </table>
                </div>
                <LoadingSpinner loading={state.loading}/>
                <ModalWindow
                    isShow={state.showModal}
                    remove={() => this.removeUser(state.userID)}
                    closeModal={this.closeModal}
                />
            </div>
        );
    }
}

Group.propTypes = {
    group: PropTypes.object.isRequired,
    updatedGroup: PropTypes.object.isRequired,
    users: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
    group: state.Group.group,
    updatedGroup: state.Group.updatedGroup,
    users: state.Group.group.data.users || []
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({
        ...groupsActionCreators
    }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Group);

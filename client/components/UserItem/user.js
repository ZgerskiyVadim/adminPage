import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import classNames from "classnames";

import formsOperations from '../../services/formsOperations';
import redirectOnPage from '../../services/redirectOnPage';

export class UserItem extends Component {
    constructor(props) {
        super(props);

        const {username, firstName, lastName, email} = this.props.user;
        this.state = {
            showForm: false,
            username,
            firstName,
            lastName,
            email,
            password: '',
            id: this.props.user._id
        };

        this.showForms = this.showForms.bind(this);
        this.handleChange = formsOperations.handleChange.bind(this);
        this.goToUser = this.goToUser.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.sendOptionsUpdate = this.sendOptionsUpdate.bind(this);
        this.remove = this.remove.bind(this);
    }

    goToUser() {
        const {_id} = this.props.user;
        !this.state.showForm && redirectOnPage.path(`/users/${_id}`);
    };

    handleClick(event) {
        event.stopPropagation();
    };

    showForms(event) {
        event.stopPropagation();
        this.setState({
            showForm: true
        });
    }

    sendOptionsUpdate() {
        this.setState({showForm: false}, () => {
            const options = formsOperations.getValidOptions(this.state);
            this.props.update(options);
        })
    };

    remove(id, event) {
        this.props.showModal(id, event);
    };

    render() {
        const {username, firstName, lastName, email, _id} = this.props.user;
        const { isJoining, index } = this.props;
        const {showForm, ...state} = this.state;

        const hiddenForm = classNames({'users--hide': !showForm});
        const shownForm = classNames({'users--hide': showForm});
        const isJoiningUser = classNames({'users--hide-remove': isJoining});

        return (
            <tbody>
            <form id={'users-form' + (index + 1)} />
            <tr onClick={this.goToUser} className='users--cursor'>
                <th>{index + 1}</th>
                <td>
                    <label htmlFor={'users-username' + (index + 1)}>{username}</label>
                    <input onChange={this.handleChange} onClick={this.handleClick} value={state.username} className={classNames('form-control', hiddenForm)} name='username' id={'users-username' + (index + 1)} form={'users-form' + (index + 1)} type="text"/>
                </td>
                <td>
                    <label htmlFor={'users-firstName' + (index + 1)}>{firstName}</label>
                    <input onChange={this.handleChange} onClick={this.handleClick} value={state.firstName} className={classNames('form-control', hiddenForm)} name='firstName' id={'users-firstName' + (index + 1)} form={'users-form' + (index + 1)} type="text"/>
                </td>
                <td>
                    <label htmlFor={'users-lastName' + (index + 1)}>{lastName}</label>
                    <input onChange={this.handleChange} onClick={this.handleClick} value={state.lastName} className={classNames('form-control', hiddenForm)} name='lastName' id={'users-lastName' + (index + 1)} form={'users-form' + (index + 1)} type="text"/>
                </td>
                <td>
                    <label htmlFor={'users-email' + (index + 1)}>{email}</label>
                    <input onChange={this.handleChange} onClick={this.handleClick} value={state.email} className={classNames('form-control', hiddenForm)} name='email' id={'users-email' + (index + 1)} form={'users-form' + (index + 1)} type="text"/>
                </td>
                <td>
                    <label htmlFor={'users-password' + (index + 1)}>****</label>
                    <input onChange={this.handleChange} onClick={this.handleClick} value={state.password} className={classNames('form-control', hiddenForm)} name='password' id={'users-password' + (index + 1)} form={'users-form' + (index + 1)} type="password"/>
                </td>
                <td className='users__buttons'>
                    <button onClick={this.showForms} className={classNames('users--margin-right btn btn-outline-primary', shownForm)} type='button'>Update</button>
                    <button onClick={this.sendOptionsUpdate} className={classNames('users--margin-right btn btn-outline-primary', hiddenForm)} type='submit' form={'users-form' + (index + 1)}>Save</button>
                    <button onClick={(event) => this.remove(_id, event)} className={classNames('btn btn-outline-danger', isJoiningUser)} type='button'>Remove</button>
                </td>
            </tr>
            </tbody>
        );
    }
}

UserItem.propTypes = {
    user: PropTypes.object.isRequired,
    update: PropTypes.func,
    showModal: PropTypes.func
};

export default withRouter(UserItem);

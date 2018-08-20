import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import classNames from "classnames";

import formsOperations from '../../services/formsOperations';
import redirectOnPage from '../../services/redirectOnPage';

export class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showForm: false,
            username: '',
            firstName: '',
            lastName: '',
            email: '',
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
        redirectOnPage.path(`/users/${_id}`);
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

    sendOptionsUpdate(event) {
        event.stopPropagation();
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
            <tr onClick={this.goToUser} className='users--cursor'>
                <th>{index + 1}</th>
                <td>
                    <h5>{username}</h5>
                    <input onChange={this.handleChange} onClick={this.handleClick} value={state.username} className={classNames('form-control', hiddenForm)} name='username' type="text"/>
                </td>
                <td>
                    <h5>{firstName}</h5>
                    <input onChange={this.handleChange} onClick={this.handleClick} value={state.firstName} className={classNames('form-control', hiddenForm)} name='firstName' type="text"/>
                </td>
                <td>
                    <h5>{lastName}</h5>
                    <input onChange={this.handleChange} onClick={this.handleClick} value={state.lastName} className={classNames('form-control', hiddenForm)} name='lastName' type="text"/>
                </td>
                <td>
                    <h5>{email}</h5>
                    <input onChange={this.handleChange} onClick={this.handleClick} value={state.email} className={classNames('form-control', hiddenForm)} name='email' type="text"/>
                </td>
                <td>
                    <h5>****</h5>
                    <input onChange={this.handleChange} onClick={this.handleClick} value={state.password} className={classNames('form-control', hiddenForm)} name='password' type="password"/>
                </td>
                <td className='users__buttons'>
                    <button onClick={this.showForms} className={classNames('users--margin-right btn btn-outline-primary', shownForm)}>Update</button>
                    <button onClick={this.sendOptionsUpdate} className={classNames('users--margin-right btn btn-outline-primary', hiddenForm)}>Save</button>
                    <button onClick={(event) => this.remove(_id, event)} className={classNames('btn btn-outline-danger', isJoiningUser)}>Remove</button>
                </td>
            </tr>
            </tbody>
        );
    }
}

User.propTypes = {
    user: PropTypes.object.isRequired,
    update: PropTypes.func,
    showModal: PropTypes.func
};

export default withRouter(User);

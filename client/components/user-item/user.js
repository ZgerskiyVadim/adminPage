import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {handleChangeState, showForms, getValidOptions} from '../../services/formsOperations';
import classNames from "classnames";

class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showForm: false,
            username: '',
            firstName: '',
            lastName: '',
            email: '',
            id: ''
        };

        this.showForms = showForms.bind(this, this.props.user._id);
        this.handleChangeState = handleChangeState.bind(this);
    }

    goToUser = () => {
        const {_id} = this.props.user;
        this.props.history.push(`/users/${_id}`);
    };

    handleClick = (e) => {
        e.stopPropagation();
    };

    sendOptionsUpdate = (e) => {
        e.stopPropagation();
        this.setState({showForm: false});
        const options = getValidOptions(this.state);
        this.props.update(options)
    };

    render() {
        const {username, firstName, lastName, email, _id} = this.props.user;
        const { isJoining, index } = this.props;
        const {showForm, ...state} = this.state;

        const hiddenForm = classNames({'users--hide': !showForm});
        const shownForm = classNames({'users--hide': showForm});
        const isJoiningUser = classNames({'users--hide': isJoining});

        return (
            <tbody>
                <tr onClick={this.goToUser} className='users--cursor'>
                    <th>{index + 1}</th>
                    <td>
                        <h5>{username}</h5>
                        <input onChange={this.handleChangeState} onClick={this.handleClick} value={state.username} className={classNames('form-control', hiddenForm)} name='username' type="text"/>
                    </td>
                    <td>
                        <h5>{firstName}</h5>
                        <input onChange={this.handleChangeState} onClick={this.handleClick} value={state.firstName} className={classNames('form-control', hiddenForm)} name='firstName' type="text"/>
                    </td>
                    <td>
                        <h5>{lastName}</h5>
                        <input onChange={this.handleChangeState} onClick={this.handleClick} value={state.lastName} className={classNames('form-control', hiddenForm)} name='lastName' type="text"/>
                    </td>
                    <td>
                        <h5>{email}</h5>
                        <input onChange={this.handleChangeState} onClick={this.handleClick} value={state.email} className={classNames('form-control', hiddenForm)} name='email' type="text"/>
                    </td>
                    <td>
                        <button onClick={this.showForms} className={classNames('users--margin-right btn btn-outline-primary', shownForm)}>Update</button>
                        <button onClick={this.sendOptionsUpdate} className={classNames('users--margin-right btn btn-outline-primary', hiddenForm)}>Save</button>
                        <button onClick={this.props.remove(_id)} className={classNames('btn btn-outline-danger', isJoiningUser)}>Remove</button>
                    </td>
                </tr>

            </tbody>
        );
    }
}

User.propTypes = {
    user: PropTypes.object.isRequired,
    update: PropTypes.func.isRequired,
    remove: PropTypes.func.isRequired
};

export default User;

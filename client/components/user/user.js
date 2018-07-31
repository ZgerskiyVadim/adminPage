import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import {handleChangeForm, showForms, getValidOptions} from '../../services/formsOperations';
import classNames from "classnames";

class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            username: '',
            firstName: '',
            lastName: '',
            email: '',
            id: ''
        };

        this.showForms = showForms.bind(this, this.props.user._id);
        this.handleChangeForm = handleChangeForm.bind(this);
        this.update = this.props.update;
        this.remove = this.props.remove;
    }

    sendOptionsUpdate = () => {
        this.setState({show: false});
        const options = getValidOptions(this.state);
        this.update(options)
    };

    render() {
        const {username, firstName, lastName, email, _id} = this.props.user;
        const { isJoining } = this.props;

        const hiddenForm = classNames({'users--hide': !this.state.show});
        const shownForm = classNames({'users--hide': this.state.show});
        const isJoiningUser = classNames({'users--hide': isJoining});

        return (
            <div className='users-row'>
                <div className='users-row col-md-9'>
                    <div className='col-md-3'>
                        <Link to={`users/${_id}`}>{username}</Link>
                        <input onChange={this.handleChangeForm} value={this.state.username} className={classNames('form-control', hiddenForm)} name='username' type="text"/>
                    </div>
                    <div className='col-md-3'>
                        <Link to={`users/${_id}`}>{firstName}</Link>
                        <input onChange={this.handleChangeForm} value={this.state.firstName} className={classNames('form-control', hiddenForm)} name='firstName' type="text"/>
                    </div>
                    <div className='col-md-3'>
                        <Link to={`users/${_id}`}>{lastName}</Link>
                        <input onChange={this.handleChangeForm} value={this.state.lastName} className={classNames('form-control', hiddenForm)} name='lastName' type="text"/>
                    </div>
                    <div className='col-md-3'>
                        <Link to={`users/${_id}`}>{email}</Link>
                        <input onChange={this.handleChangeForm} value={this.state.email} className={classNames('form-control', hiddenForm)} name='email' type="text"/>
                    </div>
                </div>
                <div className='users-buttons'>
                    <button onClick={this.showForms} className={classNames('users--margin-right btn btn-outline-primary', shownForm)}>Update</button>
                    <button onClick={this.sendOptionsUpdate} className={classNames('users--margin-right btn btn-outline-primary', hiddenForm)}>Save</button>
                    <button onClick={this.remove(_id)} className={classNames('btn btn-outline-danger', isJoiningUser)}>Remove</button>
                </div>
            </div>
        );
    }
}

export default User;

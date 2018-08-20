import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';

import './index.scss';
import * as usersActionCreators from '../../actions/action_creators/users';
import formsOperations from '../../services/formsOperations';
import LoadingSpinner from '../../components/LoadingSpinner';
import {isEqualProps} from "../../services/isEqualProps";
import showToastrMessage from "../../services/showToastrMessage";

export class CreateUserPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            firstName: '',
            lastName: '',
            email: '',
            password: ''
        };
        this.handleChange = formsOperations.handleChange.bind(this);
        this.createUser = this.createUser.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        const error = nextProps.createUser.error;

        !isEqualProps(this.props.createUser.data, nextProps.createUser.data) && showToastrMessage.success();
        error && showToastrMessage.error(error);
    }

    createUser(event) {
        event.preventDefault();
        this.props.actions.createUserRequest(this.state)
    };

    render() {
        const {username, firstName, lastName, email, password} = this.state;
        const {loading} = this.props;

        return (
            <div className='create-user'>
                <h4>Create User</h4>
                <div className='create-user--row'>
                    <div className='col-md-6'>
                        <h5>username</h5>
                        <input onChange={this.handleChange} value={username} name='username' className='form-control' type="text"/>
                        <h5>firstName</h5>
                        <input onChange={this.handleChange} value={firstName} name='firstName' className='form-control' type="text"/>
                        <h5>lastName</h5>
                        <input onChange={this.handleChange} value={lastName} name='lastName' className='form-control' type="text"/>
                        <h5>email</h5>
                        <input onChange={this.handleChange} value={email} name='email' className='form-control' type="text"/>
                        <h5>password</h5>
                        <input onChange={this.handleChange} value={password} name='password' className='form-control' type="password"/>
                    </div>

                    <button onClick={this.createUser} className='create-user__send btn btn-outline-primary'>Send</button>
                </div>
                <LoadingSpinner loading={loading}/>
            </div>
        );
    }
}

CreateUserPage.defaultProps = {
    createUser: {},
    loading: false
};

CreateUserPage.propTypes = {
    createUser: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
    createUser: state.Users.createdUser,
    loading: state.Users.createdUser.loading
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({
        ...usersActionCreators
    }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateUserPage);

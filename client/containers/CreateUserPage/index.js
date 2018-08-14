import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';

import './index.scss';
import * as usersActionCreators from '../../actions/action_creators/users';
import {handleChangeState} from '../../services/formsOperations';
import LoadingSpinner from '../../components/LoadingSpinner';
import showToastrMessage from "../../services/showToastrMessage";

class CreateUser extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            loading: false
        };
        this.handleChangeState = handleChangeState.bind(this);
        this.createUser = this.createUser.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        const {loading, error} = nextProps.createUser;
        this.setState({
            loading
        });

        error && showToastrMessage.error(error);
        // toastrMessages(nextProps.createUser);
    }

    createUser(event) {
        event.preventDefault();
        const options = {
            username : this.state.username,
            firstName : this.state.firstName,
            lastName : this.state.lastName,
            email : this.state.email,
            password : this.state.password
        } = this.state;
        this.props.actions.createUserRequest(options)
    };

    render() {
        const {loading, username, firstName, lastName, email, password} = this.state;

        return (
            <div className='create-user'>
                <h2>Create User</h2>
                <div className='create-user--row'>
                    <div className='col-md-6'>
                        <h3>username</h3>
                        <input onChange={this.handleChangeState} value={username} name='username' className='form-control' type="text"/>
                        <h3>firstName</h3>
                        <input onChange={this.handleChangeState} value={firstName} name='firstName' className='form-control' type="text"/>
                        <h3>lastName</h3>
                        <input onChange={this.handleChangeState} value={lastName} name='lastName' className='form-control' type="text"/>
                        <h3>email</h3>
                        <input onChange={this.handleChangeState} value={email} name='email' className='form-control' type="text"/>
                        <h3>password</h3>
                        <input onChange={this.handleChangeState} value={password} name='password' className='form-control' type="password"/>
                    </div>

                    <button onClick={this.createUser} className='create-user__send btn btn-outline-primary'>Send</button>
                </div>
                <LoadingSpinner loading={loading}/>
            </div>
        );
    }
}

CreateUser.propTypes = {
    createUser: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    createUser: state.CreateUser
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({
        ...usersActionCreators
    }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateUser);
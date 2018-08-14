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
            password: ''
        };
        this.handleChangeState = handleChangeState.bind(this);
        this.createUser = this.createUser.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        const {error} = nextProps.createUser;

        error && showToastrMessage.error(error);
        // toastrMessages(nextProps.createUser);
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

CreateUser.defaultProps = {
    createUser: {},
    loading: false
};

CreateUser.propTypes = {
    createUser: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
    createUser: state.CreateUser,
    loading: state.CreateUser.loading
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({
        ...usersActionCreators
    }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateUser);

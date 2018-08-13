import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';

import './index.scss';
import * as usersActionCreators from '../../actions/action_creators/users';
import {handleChangeState} from '../../services/formsOperations';
import toastrMessage from '../../services/toastrMessages';
import LoadingSpinner from '../../components/loadingSpinner';

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
        this.sendUser = this.sendUser.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        const {loading, error} = nextProps.createUserStore;
        this.setState({
            loading
        });

        toastrMessage.showError(error);
        // toastrMessages(nextProps.createUserStore);
    }

    sendUser(e) {
        e.preventDefault();
        this.props.actions.createUserRequest(this.state)
    };

    render() {
        const {loading, username, firstName, lastName, email, password} = this.state;

        return (
            <div className='create-user'>
                <h2>Create User</h2>
                <form className='create-user--row'>
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

                    <button onClick={this.sendUser} className='create-user__send btn btn-outline-primary' type='submit'>Send</button>
                </form>
                <LoadingSpinner loading={loading}/>
            </div>
        );
    }
}

CreateUser.propTypes = {
    createUserStore: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    createUserStore: state.CreateUser
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({
        ...usersActionCreators
    }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateUser);

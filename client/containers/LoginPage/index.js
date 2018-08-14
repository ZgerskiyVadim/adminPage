import React, {Component} from 'react';

import './index.scss';
import {handleChangeState} from "../../services/formsOperations";
import LoadingSpinner from '../../components/LoadingSpinner';
import AuthenticationService from "../../services/authenticationService";

class LoginPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            loading: false
        };

        this.handleChangeState = handleChangeState.bind(this);
        this.login = this.login.bind(this);
    }

    login() {
        AuthenticationService.login(this.state);
    };

    render() {
        const {loading, username, password} = this.state;

        return (
            <div className='login'>
                <h2>Create Group</h2>
                <div className='login--row'>
                    <div className='col-md-6'>
                        <h3>username</h3>
                        <input onChange={this.handleChangeState} value={username} name='username' className='form-control' type="text"/>
                        <h3>password</h3>
                        <input onChange={this.handleChangeState} value={password} name='password' className='form-control' type="password"/>
                    </div>

                    <button onClick={this.login} className='login__send btn btn-outline-primary'>Send</button>
                </div>
                <LoadingSpinner loading={loading}/>
            </div>
        );
    }
}

export default LoginPage;

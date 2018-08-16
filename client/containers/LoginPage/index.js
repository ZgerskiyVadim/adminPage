import React, {Component} from 'react';

import './index.scss';
import formsOperations from "../../services/formsOperations";
import authenticationService from "../../services/authenticationService";

class LoginPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: ''
        };

        this.handleChange = formsOperations.handleChange.bind(this);
        this.login = this.login.bind(this);
    }

    login() {
        authenticationService.login(this.state);
    };

    render() {
        const {username, password} = this.state;

        return (
            <div className='login'>
                <h2>User login</h2>
                <div className='login--row'>
                    <div className='col-md-6'>
                        <h3>username</h3>
                        <input onChange={this.handleChange} value={username} name='username' className='form-control' type="text"/>
                        <h3>password</h3>
                        <input onChange={this.handleChange} value={password} name='password' className='form-control' type="password"/>
                    </div>

                    <button onClick={this.login} className='login__send btn btn-outline-primary'>Send</button>
                </div>
            </div>
        );
    }
}

export default LoginPage;

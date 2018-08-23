import React, {Component} from 'react';

import './index.scss';
import formsOperations from "../../services/formsOperations";
import authenticationService from "../../services/authenticationService";
import LoadingSpinner from '../../components/LoadingSpinner';

export class LoginPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: ''
        };

        this.handleChange = formsOperations.handleChange.bind(this);
        this.login = this.login.bind(this);
    }

    login(event) {
        event.preventDefault();
        authenticationService.login(this.state);
    };

    render() {
        const {username, password} = this.state;
        const {loading} = this.props;

        return (
            <div className='login'>
                <h2>User login</h2>
                <form className='login--row'>
                    <div className='col-md-6'>
                        <label htmlFor='login-username'>Username</label>
                        <input onChange={this.handleChange} value={username} id='login-username' name='username' className='form-control' type="text"/>
                        <label htmlFor="login-password">Password</label>
                        <input onChange={this.handleChange} value={password} id='login-password' name='password' className='form-control' type="password"/>
                    </div>

                    <button onClick={this.login} className='login__send btn btn-outline-primary' type='submit'>Send</button>
                </form>
                <LoadingSpinner loading={loading}/>
            </div>
        );
    }
}

export default LoginPage;

import React, {Component} from 'react';
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {bindActionCreators} from "redux";

import './index.scss';
import * as usersActionCreators from "../../actions/action_creators/users";
import {handleChangeState} from "../../services/formsOperations";
import {toastrMessages} from "../../services/toastrMessages";
import LoadingSpinner from '../../components/loadingSpinner';

class LoginPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            isLoading: false
        };

        this.handleChangeState = handleChangeState.bind(this);
        this.login = this.login.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        const {isLoading} = nextProps.authenticateStore;
        this.setState({
            isLoading
        });

        toastrMessages(nextProps.authenticateStore);
    }

    login() {
        this.props.actions.login(this.state)
    };

    render() {
        const {isLoading, username, password} = this.state;

        return (
            <div className='login'>
                <h2>Create Group</h2>
                <div className='login--row'>
                    <div className='col-md-6'>
                        <h3>username</h3>
                        <input onChange={this.handleChangeState} value={username} name='username' className='form-control' type="text"/>
                        <h3>password</h3>
                        <input onChange={this.handleChangeState} value={password} name='password' className='form-control' type="text"/>
                    </div>

                    <button onClick={this.login} className='login__send btn btn-outline-primary'>Send</button>
                </div>
                <LoadingSpinner isLoading={isLoading}/>
            </div>
        );
    }
}

LoginPage.propTypes = {
    authenticateStore: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    authenticateStore: state.Authenticate
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({
        ...usersActionCreators
    }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);

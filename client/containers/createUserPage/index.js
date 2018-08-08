import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';

import './index.scss';
import * as usersActionCreators from '../../actions/action_creators/users';
import {handleChangeState} from '../../services/formsOperations';
import {toastrMessages} from '../../services/toastrMessages';
import LoadingSpinner from '../../components/loadingSpinner';

class CreateUser extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            firstName: '',
            lastName: '',
            email: '',
            isLoading: false
        };
        this.handleChangeState = handleChangeState.bind(this);
        this.sendUser = this.sendUser.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        const {isLoading} = nextProps.createUserStore;
        this.setState({
            isLoading
        });

        toastrMessages(nextProps.createUserStore);
    }

    sendUser() {
        this.props.actions.createUserRequest(this.state)
    };

    render() {
        const {isLoading, username, firstName, lastName, email} = this.state;

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
                    </div>

                    <button onClick={this.sendUser} className='create-user__send btn btn-outline-primary'>Send</button>
                </div>
                <LoadingSpinner isLoading={isLoading}/>
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

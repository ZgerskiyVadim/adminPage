import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import toastr from 'toastr';

import './index.scss';
import * as usersActionCreators from '../../actions/action_creators/users';
import {handleChangeState} from '../../services/formsOperations';
import {getErrorMessage} from '../../services/getErrorMessage';

class CreateUser extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            firstName: '',
            lastName: '',
            email: ''
        };
        this.handleChangeState = handleChangeState.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        const {error, userCreated} = nextProps.createUserStore;
        const errorMessage = getErrorMessage(nextProps.createUserStore);

        error && toastr.error(errorMessage, 'Opps!');
        userCreated && toastr.info('User created', 'Ok!');
    }

    sendUser = () => {
        this.props.actions.createUserRequest(this.state)
    };

    render() {
        return (
            <div className='create-user'>
                <h2>Create User</h2>
                <div className='create-user--row'>
                    <div className='col-md-6'>
                        <h3>username</h3>
                        <input onChange={this.handleChangeState} value={this.state.username} name='username' className='form-control' type="text"/>
                        <h3>firstName</h3>
                        <input onChange={this.handleChangeState} value={this.state.firstName} name='firstName' className='form-control' type="text"/>
                        <h3>lastName</h3>
                        <input onChange={this.handleChangeState} value={this.state.lastName} name='lastName' className='form-control' type="text"/>
                        <h3>email</h3>
                        <input onChange={this.handleChangeState} value={this.state.email} name='email' className='form-control' type="text"/>
                    </div>

                    <button onClick={this.sendUser} className='create-user-send btn btn-outline-primary'>Send</button>
                </div>
            </div>
        );
    }
}

CreateUser.propTypes = {
    createUserStore: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    createUserStore: state.createUserReducer
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({
        ...usersActionCreators
    }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateUser);

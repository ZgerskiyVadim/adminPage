import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import toastr from 'toastr';

import './index.scss';
import * as createActionCreators from '../../actions/action_creators/create';
import {handleChangeForm} from '../../services/formsOperations';
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
        this.handleChangeForm = handleChangeForm.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        const {error, userCreated} = nextProps.createStore;
        const errorMessage = getErrorMessage(nextProps.createStore);

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
                        <input onChange={this.handleChangeForm} value={this.state.username} name='username' className='form-control' type="text"/>
                        <h3>firstName</h3>
                        <input onChange={this.handleChangeForm} value={this.state.firstName} name='firstName' className='form-control' type="text"/>
                        <h3>lastName</h3>
                        <input onChange={this.handleChangeForm} value={this.state.lastName} name='lastName' className='form-control' type="text"/>
                        <h3>email</h3>
                        <input onChange={this.handleChangeForm} value={this.state.email} name='email' className='form-control' type="text"/>
                    </div>

                    <button onClick={this.sendUser} className='create-user-send btn btn-outline-primary'>Send</button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    createStore: state.createReducer
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({
        ...createActionCreators
    }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateUser);

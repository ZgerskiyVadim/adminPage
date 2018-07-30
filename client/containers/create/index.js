import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import toastr from 'toastr';

import './index.scss';
import * as createActionCreators from '../../actions/action_creators/create';
import {onChangeForm} from '../../services/formsOperations';

class Create extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                username: '',
                firstName: '',
                lastName: '',
                email: ''
            },
            group: {
                name: '',
                title: ''
            }
        };
    }

    componentWillReceiveProps(nextProps) {
        const errorMessage = nextProps.createStore.error && (nextProps.createStore.error.response.data.message || nextProps.createStore.error.message);
        nextProps.createStore.error && toastr.error(errorMessage, 'Opps!');
        nextProps.createStore.userCreated && toastr.info('User created', 'Ok!');
        nextProps.createStore.groupCreated && toastr.info('Group created', 'Ok!');
    }

    onChangeUser = (event) => {
        onChangeForm.call(this, event, 'user');
    };

    onChangeGroup = (event) => {
        onChangeForm.call(this, event, 'group');
    };

    sendUser = () => {
        this.props.actions.createUserRequest(this.state.user)
    };

    sendGroup = () => {
        this.props.actions.createGroupRequest(this.state.group)
    };

    render() {
        return (
            <div className='create'>
                <h2>Create User</h2>
                <div className='create-row create--margin-bottom'>
                    <div className='col-md-6'>
                        <h3>username</h3>
                        <input onChange={this.onChangeUser} value={this.state.user.username} name='username' className='form-control' type="text"/>
                        <h3>firstName</h3>
                        <input onChange={this.onChangeUser} value={this.state.user.firstName} name='firstName' className='form-control' type="text"/>
                        <h3>lastName</h3>
                        <input onChange={this.onChangeUser} value={this.state.user.lastName} name='lastName' className='form-control' type="text"/>
                        <h3>email</h3>
                        <input onChange={this.onChangeUser} value={this.state.user.email} name='email' className='form-control' type="text"/>
                    </div>

                    <button onClick={this.sendUser} className='create-send btn btn-outline-primary'>Send</button>
                </div>
                <h2>Create Group</h2>
                <div className='create-row'>
                    <div className='col-md-6'>
                        <h3>name</h3>
                        <input onChange={this.onChangeGroup} value={this.state.group.name} name='name' className='form-control' type="text"/>
                        <h3>title</h3>
                        <input onChange={this.onChangeGroup} value={this.state.group.title} name='title' className='form-control' type="text"/>
                    </div>

                    <button onClick={this.sendGroup} className='create-send btn btn-outline-primary'>Send</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(Create);

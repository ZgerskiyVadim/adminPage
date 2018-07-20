import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import * as types from '../../actions';
import { onChangeForm, showForms, getOptions } from '../../services/userAndGroupHelper';

class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            username: '',
            firstName: '',
            lastName: '',
            email: '',
            id: ''
        };

        this.onChangeForm = onChangeForm.bind(this);
        this.update = this.update.bind(this);
    }

    update() {
        this.setState({show: false});
        const options = getOptions(this.state);
        this.props.updateUser(options);
    }

    remove(id) {
        this.props.removeUser(id);
    }

    render() {
        const hiddenForm = {display: this.state.show ? "block" : "none"};
        const shownForm = {display: !this.state.show ? "block" : "none"};

        return (
            <div className='users-row'>
                <div className='users-row col-md-9'>
                    <div className='col-md-3'>
                        <Link to={`users/${this.props.user._id}`}>{this.props.user.username}</Link>
                        <input onChange={this.onChangeForm} value={this.state.username} className='form-control' style={hiddenForm} name='username' type="text"/>
                    </div>
                    <div className='col-md-3'>
                        <Link to={`users/${this.props.user._id}`}>{this.props.user.firstName}</Link>
                        <input onChange={this.onChangeForm} value={this.state.firstName} className='form-control' style={hiddenForm} name='firstName' type="text"/>
                    </div>
                    <div className='col-md-3'>
                        <Link to={`users/${this.props.user._id}`}>{this.props.user.lastName}</Link>
                        <input onChange={this.onChangeForm} value={this.state.lastName} className='form-control' style={hiddenForm} name='lastName' type="text"/>
                    </div>
                    <div className='col-md-3'>
                        <Link to={`users/${this.props.user._id}`}>{this.props.user.email}</Link>
                        <input onChange={this.onChangeForm} value={this.state.email} className='form-control' style={hiddenForm} name='email' type="text"/>
                    </div>
                </div>
                <div className='users-buttons'>
                    <button onClick={showForms.bind(this, this.props.user._id)} className='users--margin-right btn btn-outline-primary' style={shownForm}>Update</button>
                    <button onClick={this.update} className='users--margin-right btn btn-outline-primary' style={hiddenForm}>Save</button>
                    <button onClick={this.remove.bind(this, this.props.user._id)} className='btn btn-outline-danger'>Remove</button>
                </div>
            </div>
        );
    }
}

export default connect(
    state => ({
        stateStore: state
    }),
    dispatch => ({
        updateUser: (options) => {
            dispatch({type: types.UPDATE_USER_REQUEST, payload: options});
        },
        removeUser: (id) => {
            dispatch({type: types.REMOVE_USER_REQUEST, payload: id});
        }
    })
)(User)
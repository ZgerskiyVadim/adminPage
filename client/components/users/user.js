import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import * as actions from '../../actions/constants';
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

        this.search = this.search.bind(this);
    }

    search(event) {
        this.props.search(event.target.value);
    }

    update() {
        this.setState({show: false});
        this.props.updateUser(getOptions(this.state));
    }

    remove(id) {
        this.props.removeUser(id);
    }

    render() {
        const hiddenForm = {display: this.state.show ? "block" : "none"};
        const shownForm = {display: !this.state.show ? "block" : "none"};

        return (
            <div className='users-row col-md-9'>
                <div className='users-row col-md-12'>
                    <div className='users-prop col-md-3'>
                        <Link to={`users/${this.props.user._id}`}>{this.props.user.username}</Link>
                        <input onChange={onChangeForm.bind(this)} value={this.state.username} className='form-control' style={hiddenForm} name='username' type="text"/>
                    </div>
                    <div className='users-prop col-md-3'>
                        <Link to={`users/${this.props.user._id}`}>{this.props.user.firstName}</Link>
                        <input onChange={onChangeForm.bind(this)} value={this.state.firstName} className='form-control' style={hiddenForm} name='firstName' type="text"/>
                    </div>
                    <div className='users-prop col-md-3'>
                        <Link to={`users/${this.props.user._id}`}>{this.props.user.lastName}</Link>
                        <input onChange={onChangeForm.bind(this)} value={this.state.lastName} className='form-control' style={hiddenForm} name='lastName' type="text"/>
                    </div>
                    <div className='users-prop col-md-3'>
                        <Link to={`users/${this.props.user._id}`}>{this.props.user.email}</Link>
                        <input onChange={onChangeForm.bind(this)} value={this.state.email} className='form-control' style={hiddenForm} name='email' type="text"/>
                    </div>
                </div>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <button onClick={showForms.bind(this, this.props.user._id)} className='btn btn-outline-primary' style={shownForm}>Update</button>
                    <button onClick={this.update.bind(this)} className='btn btn-outline-primary' style={hiddenForm}>Save</button>
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
            dispatch({type: actions.UPDATE_USER_REQUEST, payload: options});
        },
        removeUser: (id) => {
            dispatch({type: actions.REMOVE_USER_REQUEST, payload: id});
        }
    })
)(User)
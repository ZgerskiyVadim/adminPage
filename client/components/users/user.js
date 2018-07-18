import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import * as actions from '../../actions/constants';

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

    onChangeForm(event) {
        const {value, name} = event.target;
        this.setState({
            [name]: value
        });
    };

    showForms(id) {
        this.setState({
            id,
            show: true
        })
    }

    getOptions() {
        const options = {};
        for (const prop in this.state) {
            if (this.state[prop]) {
                options[prop] = this.state[prop];
            }
        }
        return options;
    }

    update() {
        this.setState({show: false});
        this.props.updateUser(this.getOptions());
    }

    remove(id) {
        this.props.removeUser(id);
    }

    render() {
        const hiddenForm = {display: this.state.show ? "block" : "none"};
        const shownForm = {display: !this.state.show ? "block" : "none"};

        return (
            <div className='user-row'>
                <div>
                    <Link to={`users/${this.props.user._id}`}>{this.props.user.username}</Link>
                    <input onChange={this.onChangeForm.bind(this)} value={this.state.username} style={hiddenForm} name='username' type="text"/>
                </div>
                <div>
                    <Link to={`users/${this.props.user._id}`}>{this.props.user.firstName}</Link>
                    <input onChange={this.onChangeForm.bind(this)} value={this.state.firstName} style={hiddenForm} name='firstName' type="text"/>
                </div>
                <div>
                    <Link to={`users/${this.props.user._id}`}>{this.props.user.lastName}</Link>
                    <input onChange={this.onChangeForm.bind(this)} value={this.state.lastName} style={hiddenForm} name='lastName' type="text"/>
                </div>
                <div>
                    <Link to={`users/${this.props.user._id}`}>{this.props.user.email}</Link>
                    <input onChange={this.onChangeForm.bind(this)} value={this.state.email} style={hiddenForm} name='email' type="text"/>
                </div>

                <button style={shownForm} onClick={this.showForms.bind(this, this.props.user._id)}>Update</button>
                <button style={hiddenForm} onClick={this.update.bind(this)}>Save</button>
                <button onClick={this.remove.bind(this, this.props.user._id)}>Remove</button>
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
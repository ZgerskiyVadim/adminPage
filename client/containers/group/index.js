import React, { Component } from 'react';
import {connect} from "react-redux";
import { Link } from "react-router-dom";
import './index.scss';
import * as actions from '../../actions/constants';
import { onChangeForm, showForms, getOptions } from '../../services/userAndGroupHelper';

class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            name: '',
            title: '',
            id: this.props.match.params.id
        };

        this.onChangeForm = onChangeForm.bind(this);
        this.update = this.update.bind(this);
    }

    componentDidMount() {
        this.props.getGroup(this.state.id);
    }

    update() {
        this.setState({show: false});
        const options = getOptions(this.state);
        this.props.updateGroup(options);
    }

    removeUser(id) {
        this.props.removeUser(this.state.id, id)
    }

    render() {
        const hiddenForm = {display: this.state.show ? "block" : "none"};
        const shownForm = {display: !this.state.show ? "block" : "none"};
        const isUsers = {display: this.props.stateStore.groupReducer.users.length ? 'block' : 'none'};

        return (
            <div>
                <h1>GROUP</h1>
                <div className='group'>
                    <div className='group--margin-right'>
                        <h3>name: {this.props.stateStore.groupReducer.name}</h3>
                        <input onChange={this.onChangeForm} value={this.state.name} className='form-control' style={hiddenForm} name='name' type="text"/>
                        <h3>title: {this.props.stateStore.groupReducer.title}</h3>
                        <input onChange={this.onChangeForm} value={this.state.title} className='form-control' style={hiddenForm} name='title' type="text"/>
                    </div>

                    <button onClick={showForms.bind(this, this.state.id)} style={shownForm} className='btn btn-outline-primary'>Update</button>
                    <button onClick={this.update} style={hiddenForm} className='btn btn-outline-primary'>Save</button>
                </div>

                <h1 style={isUsers}>Users</h1>
                {
                    this.props.stateStore.groupReducer.users.map(user =>
                        <div className='group__users col-md-6' key={user._id}>
                            <div>
                                <Link to={`/users/${user._id}`}>
                                    <h4>username: {user.username}</h4>
                                </Link>
                                <Link to={`/users/${user._id}`}>
                                    <h4>firstName: {user.firstName}</h4>
                                </Link>
                                <Link to={`/users/${user._id}`}>
                                    <h4>lastName: {user.lastName}</h4>
                                </Link>
                                <Link to={`/users/${user._id}`}>
                                    <h4>email: {user.email}</h4>
                                </Link>
                            </div>
                            <button onClick={this.removeUser.bind(this, user._id)} className='group__remove-user btn btn-outline-danger'>remove user</button>
                        </div>
                    )
                }
            </div>
        );
    }
}

export default connect(
    state => ({
        stateStore: state
    }),
    dispatch => ({
        getGroup: (id) => {
            dispatch({type: actions.GET_GROUP_REQUEST, payload: id});
        },
        updateGroup: (options) => {
            dispatch({type: actions.UPDATE_GROUP_REQUEST, payload: options});
        },
        removeUser: (groupID, userID) => {
            dispatch({type: actions.REMOVE_USER_FROM_GROUP, payload: {userID, groupID}});
        }
    })
)(User)
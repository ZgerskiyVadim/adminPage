import React, { Component } from 'react';
import {connect} from "react-redux";
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
        }
    }

    componentDidMount() {
        this.props.getGroup(this.state.id);
    }

    update() {
        this.setState({show: false});
        this.props.updateGroup(getOptions(this.state));
    }

    removeUser(id) {
        this.props.removeUser(this.state.id, id)
    }

    render() {
        const hiddenForm = {display: this.state.show ? "block" : "none"};
        const shownForm = {display: !this.state.show ? "block" : "none"};

        return (
            <div>
                <h1>GROUP</h1>
                <div className='group'>
                    <div>
                        <h3>name: {this.props.stateStore.groupReducer.name}</h3>
                        <input onChange={onChangeForm.bind(this)} value={this.state.name} style={hiddenForm} name='name' type="text"/>
                        <h3>title: {this.props.stateStore.groupReducer.title}</h3>
                        <input onChange={onChangeForm.bind(this)} value={this.state.title} style={hiddenForm} name='title' type="text"/>
                    </div>

                    <button style={shownForm} onClick={showForms.bind(this, this.state.id)}>Update</button>
                    <button style={hiddenForm} onClick={this.update.bind(this)}>Save</button>
                </div>

                <h1>Users</h1>
                {
                    this.props.stateStore.groupReducer.users.map(user =>
                        <div className='users' key={user._id}>
                            <div>
                                <h4>name: {user.username}</h4>
                                <h4>title: {user.firstName}</h4>
                                <h4>title: {user.lastName}</h4>
                                <h4>title: {user.email}</h4>
                            </div>
                            <button onClick={this.removeUser.bind(this, user._id)}>remove user</button>
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
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import * as types from '../../actions';
import { onChangeForm, showForms, getOptions } from '../../services/userAndGroupHelper';

class Group extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            name: '',
            title: '',
            id: ''
        };

        this.onChangeForm = onChangeForm.bind(this);
        this.update = this.update.bind(this);
    }

    joinGroup(groupID) {
        const userID = this.props.stateStore.userReducer.user._id;
        this.props.joinGroup(userID, groupID);
    }

    update() {
        this.setState({show: false});
        const options = getOptions(this.state);
        this.props.updateGroup(options);
    }

    remove(id) {
        this.props.removeGroup(id);
    }

    render() {
        const hiddenForm = {display: this.state.show && !this.props.stateStore.userReducer.joiningGroup ? "block" : "none"};
        const shownForm = {display: !this.state.show && !this.props.stateStore.userReducer.joiningGroup ? "block" : "none"};
        const joiningGroup = {display: this.props.stateStore.userReducer.joiningGroup ? "block" : "none"};
        const notJoiningGroup = {display: !this.props.stateStore.userReducer.joiningGroup ? "block" : "none"};

        return (
            <div className='groups-row'>
                <div className='groups-row col-md-4'>
                    <div className='col-md-6'>
                        <Link to={`groups/${this.props.group._id}`}>{this.props.group.name}</Link>
                        <input onChange={this.onChangeForm} value={this.state.name} className='form-control' style={hiddenForm} name='name' type="text"/>
                    </div>
                    <div className='col-md-6'>
                        <Link to={`groups/${this.props.group._id}`}>{this.props.group.title}</Link>
                        <input onChange={this.onChangeForm} value={this.state.title} className='form-control' style={hiddenForm} name='title' type="text"/>
                    </div>
                </div>

                <div className='groups-buttons'>
                    <button onClick={showForms.bind(this, this.props.group._id)} style={shownForm} className='groups--margin-right btn btn-outline-primary'>Update</button>
                    <button onClick={this.update} style={hiddenForm} className='groups--margin-right btn btn-outline-primary'>Save</button>
                    <button onClick={this.remove.bind(this, this.props.group._id)} style={notJoiningGroup} className='btn btn-outline-danger'>Remove</button>
                    <button onClick={this.joinGroup.bind(this, this.props.group._id)} style={joiningGroup} className='btn btn-outline-info'>Join group</button>
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
        updateGroup: (options) => {
            dispatch({type: types.UPDATE_GROUP_REQUEST, payload: options});
        },
        joinGroup: (userID, groupID) => {
            dispatch({type: types.ADD_USER_IN_GROUP_REQUEST, payload: {userID, groupID}})
        },
        removeGroup: (id) => {
            dispatch({type: types.REMOVE_GROUP_REQUEST, payload: id});
        }
    })
)(Group)
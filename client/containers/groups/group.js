import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { onChangeForm, showForms, getOptions } from '../../services/userAndGroupHelper';


class Group extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            name: '',
            title: '',
            id: '',
            userID: this.props.userID ? this.props.userID : null
        };

        this.onChangeForm = onChangeForm.bind(this);
        this.joinGroup = this.props.joinGroup;
        this.update = this.props.update;
        this.remove = this.props.remove;
    }

    sendOptionsJoinGroup = (groupID) => (e) => {
        const userID = this.state.userID;
        userID && this.joinGroup({userID, groupID});
    };

    sendOptionsUpdate = () => {
        this.setState({show: false});
        const options = getOptions(this.state);
        this.update(options)
    };

    render() {
        const { isJoiningGroup } = this.props;

        const hiddenForm = {display: this.state.show && !isJoiningGroup ? "block" : "none"};
        const shownForm = {display: !this.state.show && !isJoiningGroup ? "block" : "none"};
        const joiningGroup = {display: isJoiningGroup ? "block" : "none"};
        const notJoiningGroup = {display: !isJoiningGroup ? "block" : "none"};

        return (
            <div className='groups-row'>
                <div className='groups-row col-md-8'>
                    <div className='col-md-4'>
                        <Link to={`groups/${this.props.group._id}`}>{this.props.group.name}</Link>
                        <input onChange={this.onChangeForm} value={this.state.name} className='form-control' style={hiddenForm} name='name' type="text"/>
                    </div>
                    <div className='col-md-4'>
                        <Link to={`groups/${this.props.group._id}`}>{this.props.group.title}</Link>
                        <input onChange={this.onChangeForm} value={this.state.title} className='form-control' style={hiddenForm} name='title' type="text"/>
                    </div>
                    <div className='col-md-4'>
                        <span>{this.props.group.users.length}</span>
                    </div>
                </div>

                <div className='groups-buttons'>
                    <button onClick={showForms.bind(this, this.props.group._id)} style={shownForm} className='groups--margin-right btn btn-outline-primary'>Update</button>
                    <button onClick={this.sendOptionsUpdate} style={hiddenForm} className='groups--margin-right btn btn-outline-primary'>Save</button>
                    <button onClick={this.remove(this.props.group._id)} style={notJoiningGroup} className='btn btn-outline-danger'>Remove</button>
                    <button onClick={this.sendOptionsJoinGroup(this.props.group._id)} style={joiningGroup} className='btn btn-outline-info'>Join group</button>
                </div>
            </div>
        );
    }
}

export default Group
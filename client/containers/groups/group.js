import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { bindActionCreators } from 'redux';
import * as groupsActionCreators from '../../actions/action_creators/groups';
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
        const userID = this.props.user.user._id;
        this.props.actions.joinGroup({userID, groupID});
    }

    update() {
        this.setState({show: false});
        const options = getOptions(this.state);
        this.props.actions.updateGroupRequest(options);
    }

    remove(id) {
        this.props.actions.removeGroupRequest(id);
    }

    render() {
        const hiddenForm = {display: this.state.show && !this.props.user.joiningGroup ? "block" : "none"};
        const shownForm = {display: !this.state.show && !this.props.user.joiningGroup ? "block" : "none"};
        const joiningGroup = {display: this.props.user.joiningGroup ? "block" : "none"};
        const notJoiningGroup = {display: !this.props.user.joiningGroup ? "block" : "none"};

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

const mapStateToProps = (state) => ({
    user: state.userReducer
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({
        ...groupsActionCreators
    }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Group)
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { onChangeForm, showForms, getOptions } from '../../services/userAndGroupHelper';
import { bindActionCreators } from 'redux';
import * as usersActionCreators from "../../actions/action_creators/users";

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
        this.props.actions.updateUserRequest(options);
    }

    remove(id) {
        this.props.actions.removeUserRequest(id);
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

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({
        ...usersActionCreators
    }, dispatch)
});

export default connect(null, mapDispatchToProps)(User)
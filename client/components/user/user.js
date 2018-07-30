import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import {onChangeForm, showForms, getValidOptions} from '../../services/formsOperations';

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

        this.showForms = showForms.bind(this, this.props.user._id);
        this.onChangeForm = onChangeForm.bind(this);
        this.update = this.props.update;
        this.remove = this.props.remove;
    }

    sendOptionsUpdate = () => {
        this.setState({show: false});
        const options = getValidOptions(this.state);
        this.update(options)
    };

    render() {
        const { isJoining } = this.props;
        const hiddenForm = {display: this.state.show ? 'block' : 'none'};
        const shownForm = {display: !this.state.show ? 'block' : 'none'};
        const isJoiningUser = {display: isJoining ? 'none' : 'block'};

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
                    <button onClick={this.showForms} className='users--margin-right btn btn-outline-primary' style={shownForm}>Update</button>
                    <button onClick={this.sendOptionsUpdate} className='users--margin-right btn btn-outline-primary' style={hiddenForm}>Save</button>
                    <button onClick={this.remove(this.props.user._id)} style={isJoiningUser} className='btn btn-outline-danger'>Remove</button>
                </div>
            </div>
        );
    }
}

export default User;

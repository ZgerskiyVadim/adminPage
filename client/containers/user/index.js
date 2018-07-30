import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import toastr from 'toastr';

import './index.scss';
import * as userActionCreators from '../../actions/action_creators/user';
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
            id: this.props.match.params.id
        };

        this.onChangeForm = onChangeForm.bind(this);
        this.showForms = showForms.bind(this, this.state.id);
    }

    componentDidMount() {
        const isJoining = false;
        this.props.actions.joinGroup(isJoining);
        this.props.actions.getUserRequest(this.state.id);
    }

    componentWillReceiveProps(nextProps) {
        const errorMessage = nextProps.userStore.error && (nextProps.userStore.error.response.data.message || nextProps.userStore.error.message);
        nextProps.userStore.error && toastr.error(errorMessage, 'Opps!');
        nextProps.userStore.isLeftGroup && toastr.info('User left group', 'Ok!');
        nextProps.userStore.isUpdated && toastr.success('User updated', 'Ok!');
    }

    update = () => {
        this.setState({show: false});
        const options = getValidOptions(this.state);
        this.props.actions.updateUserRequest(options);
    };

    joinGroup = () => {
        const joinGroup = true;
        this.props.actions.joinGroup(joinGroup);
        this.props.history.push('/groups');
    };

    leaveGroup = (id) => (e) => {
        const options = {
            userID: this.state.id,
            groupID: id
        };
        this.props.actions.leaveGroupRequest(options);
    };

    render() {
        const hiddenForm = {display: this.state.show ? 'block' : 'none'};
        const shownForm = {display: !this.state.show ? 'block' : 'none'};
        const isGroups = {display: this.props.userStore.groups.length ? 'block' : 'none'};

        return (
            <div className='user'>
               <h1>USER</h1>
                <div className='user-info'>
                    <div className='user--margin-right'>
                        <h3>username: {this.props.userStore.user.username}</h3>
                        <input onChange={this.onChangeForm} value={this.state.username} className='form-control' style={hiddenForm} name='username' type="text"/>
                        <h3>firstName: {this.props.userStore.user.firstName}</h3>
                        <input onChange={this.onChangeForm} value={this.state.firstName} className='form-control' style={hiddenForm} name='firstName' type="text"/>
                        <h3>lastName: {this.props.userStore.user.lastName}</h3>
                        <input onChange={this.onChangeForm} value={this.state.lastName} className='form-control' style={hiddenForm} name='lastName' type="text"/>
                        <h3>email: {this.props.userStore.user.email}</h3>
                        <input onChange={this.onChangeForm} value={this.state.email} className='form-control' style={hiddenForm} name='email' type="text"/>
                    </div>
                    <button onClick={this.showForms} style={shownForm} className='user--margin-right btn btn-outline-primary'>Update</button>
                    <button onClick={this.update} style={hiddenForm} className='user--margin-right btn btn-outline-primary'>Save</button>
                    <button onClick={this.joinGroup} className='btn btn-outline-info'>Join group</button>
                </div>

                <h1 style={isGroups}>Groups</h1>
                {
                    this.props.userStore.groups.map(group =>
                        <div className='user__groups col-md-4 col-sm-6' key={group._id}>
                            <div>
                                <Link to={`/groups/${group._id}`}>
                                    <h4>name: {group.name}</h4>
                                </Link>
                                <Link to={`/groups/${group._id}`}>
                                    <h4>title: {group.title}</h4>
                                </Link>
                            </div>
                            <button onClick={this.leaveGroup(group._id)} className='user__leave-group btn btn-outline-danger'>leave group</button>
                        </div>
                    )
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    userStore: state.userReducer
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({
        ...userActionCreators
    }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(User);

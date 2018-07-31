import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import toastr from 'toastr';

import './index.scss';
import * as userActionCreators from '../../actions/action_creators/user';
import {handleChangeForm, showForms, getValidOptions} from '../../services/formsOperations';
import {getErrorMessage} from '../../services/getErrorMessage';

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

        this.handleChangeForm = handleChangeForm.bind(this);
        this.showForms = showForms.bind(this, this.state.id);
    }

    componentDidMount() {
        const stopJoinGroup = false;
        this.props.actions.joinGroup(stopJoinGroup);
        this.props.actions.getUserRequest(this.state.id);
    }

    componentWillReceiveProps(nextProps) {
        const {error, isLeftGroup, isUpdated} = nextProps.userStore;
        const errorMessage = getErrorMessage(nextProps.userStore);

        const status = error && (error.response.data.status || error.response.status);
        if (status === 404) {
            toastr.error('User not found!', 'Opps!');
            return this.props.history.push('/');
        }
        error && toastr.error(errorMessage, 'Opps!');
        isLeftGroup && toastr.info('User left group', 'Ok!');
        isUpdated && toastr.success('User updated', 'Ok!');
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
        const {username, firstName, lastName, email} = this.props.userStore.user;

        const hiddenForm = {display: this.state.show ? 'block' : 'none'};
        const shownForm = {display: !this.state.show ? 'block' : 'none'};
        const isGroups = {display: this.props.userStore.groups.length ? 'block' : 'none'};

        return (
            <div className='user'>
               <h1>USER</h1>
                <div className='user-info'>
                    <div className='user--margin-right'>
                        <h3>username: {username}</h3>
                        <input onChange={this.handleChangeForm} value={this.state.username} className='form-control' style={hiddenForm} name='username' type="text"/>
                        <h3>firstName: {firstName}</h3>
                        <input onChange={this.handleChangeForm} value={this.state.firstName} className='form-control' style={hiddenForm} name='firstName' type="text"/>
                        <h3>lastName: {lastName}</h3>
                        <input onChange={this.handleChangeForm} value={this.state.lastName} className='form-control' style={hiddenForm} name='lastName' type="text"/>
                        <h3>email: {email}</h3>
                        <input onChange={this.handleChangeForm} value={this.state.email} className='form-control' style={hiddenForm} name='email' type="text"/>
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

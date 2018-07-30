import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import toastr from 'toastr';

import './index.scss';
import * as groupActionCreators from '../../actions/action_creators/group';
import {onChangeForm, showForms, getValidOptions} from '../../services/formsOperations';

class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            name: '',
            title: '',
            id: this.props.match.params.id
        };

        this.showForms = showForms.bind(this, this.state.id);
        this.onChangeForm = onChangeForm.bind(this);
    }

    componentDidMount() {
        this.props.actions.getGroupRequest(this.state.id);
    }

    componentWillReceiveProps(nextProps) {
        const errorMessage = nextProps.group.error && (nextProps.group.error.response.data.errmsg || nextProps.group.error.message);
        const status = nextProps.group.error && (nextProps.group.error.response.data.status || nextProps.group.error.response.status);
        if (status === 404) {
            toastr.error('Group not found!', 'Opps!');
            return this.props.history.push('/');
        }
        nextProps.group.error && toastr.error(errorMessage, 'Opps!');
        nextProps.group.isUpdated && toastr.success('Success!', 'Ok!');
    }

    update = () => {
        this.setState({show: false});
        const options = getValidOptions(this.state);
        this.props.actions.updateGroupRequest(options);
    };

    removeUser = (id) => (e) => {
        const options = {
            groupID: this.state.id,
            userID: id
        };
        this.props.actions.removeUserRequest(options);
    };

    render() {
        const hiddenForm = {display: this.state.show ? 'block' : 'none'};
        const shownForm = {display: !this.state.show ? 'block' : 'none'};
        const isUsers = {display: this.props.group.users.length ? 'block' : 'none'};

        return (
            <div className='group'>
                <h1>GROUP</h1>
                <div className='group-info'>
                    <div className='group--margin-right'>
                        <h3>name: {this.props.group.name}</h3>
                        <input onChange={this.onChangeForm} value={this.state.name} className='form-control' style={hiddenForm} name='name' type="text"/>
                        <h3>title: {this.props.group.title}</h3>
                        <input onChange={this.onChangeForm} value={this.state.title} className='form-control' style={hiddenForm} name='title' type="text"/>
                    </div>

                    <button onClick={this.showForms} style={shownForm} className='btn btn-outline-primary'>Update</button>
                    <button onClick={this.update} style={hiddenForm} className='btn btn-outline-primary'>Save</button>
                </div>

                <h1 style={isUsers}>Users</h1>
                {
                    this.props.group.users.map(user =>
                        <div className='group__users col-md-4 col-sm-6' key={user._id}>
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
                            <button onClick={this.removeUser(user._id)} className='group__remove-user btn btn-outline-danger'>remove user</button>
                        </div>
                    )
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    group: state.groupReducer
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({
        ...groupActionCreators
    }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(User);

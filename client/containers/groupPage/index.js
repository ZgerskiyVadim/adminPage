import React, {Component} from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames';
import {Link} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import toastr from 'toastr';

import './index.scss';
import * as groupActionCreators from '../../actions/action_creators/group';
import {handleChangeForm, showForms, getValidOptions} from '../../services/formsOperations';
import {getErrorMessage} from '../../services/getErrorMessage';

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
        this.handleChangeForm = handleChangeForm.bind(this);
    }

    componentDidMount() {
        this.props.actions.getGroupRequest(this.state.id);
    }

    componentWillReceiveProps(nextProps) {
        const {error, isUpdated} = nextProps.group;
        const errorMessage = getErrorMessage(nextProps.group);

        const status = error && (error.response.data.status || error.response.status);
        if (status === 404) {
            toastr.error('Group not found!', 'Opps!');
            return this.props.history.push('/');
        }
        error && toastr.error(errorMessage, 'Opps!');
        isUpdated && toastr.success('Success!', 'Ok!');
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
        const {name, title} = this.props.group;

        const hiddenForm = classNames({'group--hide': !this.state.show});
        const shownForm = classNames({'group--hide': this.state.show});
        const isUsers = classNames({'group--hide': !this.props.group.users.length});

        return (
            <div className='group'>
                <h1>GROUP</h1>
                <div className='group-info'>
                    <div className='group--margin-right'>
                        <h3>name: {name}</h3>
                        <input onChange={this.handleChangeForm} value={this.state.name} className={classNames('form-control', hiddenForm)} name='name' type="text"/>
                        <h3>title: {title}</h3>
                        <input onChange={this.handleChangeForm} value={this.state.title} className={classNames('form-control', hiddenForm)} name='title' type="text"/>
                    </div>

                    <button onClick={this.showForms} className={classNames('btn btn-outline-primary', shownForm)}>Update</button>
                    <button onClick={this.update} className={classNames('btn btn-outline-primary', hiddenForm)}>Save</button>
                </div>

                <h1 className={isUsers}>Users</h1>
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
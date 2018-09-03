import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';

import './index.scss';
import * as groupsActionCreators from '../../actions/action_creators/groups';
import formsOperations from '../../services/formsOperations';
import LoadingSpinner from '../../components/LoadingSpinner';
import isEqual from "lodash.isequal";
import showToastrMessage from "../../services/showToastrMessage";
import redirectOnPage from "../../services/redirectOnPage";

export class CreateGroupPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            title: ''
        };
        this.handleChange = formsOperations.handleChange.bind(this);
        this.createGroup = this.createGroup.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        const error = nextProps.createGroup.error;

        error && showToastrMessage.error(error);

        if (!isEqual(this.props.createGroup.data, nextProps.createGroup.data)) {
            showToastrMessage.success();
            redirectOnPage.path('/groups');
        }
    }

    createGroup(event) {
        event.preventDefault();
        this.props.actions.createGroupRequest(this.state);
    };

    render() {
        const {name, title} = this.state;
        const {loading} = this.props;

        return (
            <div className='create-group'>
                <h4>Create Group</h4>
                <form className='create-group--row col-md-4'>
                    <div>
                        <label htmlFor='create-name'>name</label>
                        <input onChange={this.handleChange} value={name} name='name' id='create-name' className='form-control' type="text"/>
                        <label htmlFor='create-title'>title</label>
                        <input onChange={this.handleChange} value={title} name='title' id='create-title' className='form-control' type="text"/>
                    </div>

                    <button onClick={this.createGroup} className='create-group__send btn btn-outline-primary' type='subnit'>Send</button>
                </form>
                <LoadingSpinner loading={loading}/>
            </div>
        );
    }
}

CreateGroupPage.defaultProps = {
    createGroup: {},
    loading: false
};

CreateGroupPage.propTypes = {
    createGroup: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
    createGroup: state.Groups.createdGroup,
    loading: state.Groups.createdGroup.loading
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({
        ...groupsActionCreators
    }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateGroupPage);

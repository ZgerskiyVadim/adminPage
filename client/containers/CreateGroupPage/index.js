import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';

import './index.scss';
import * as groupsActionCreators from '../../actions/action_creators/groups';
import formsOperations from '../../services/formsOperations';
import LoadingSpinner from '../../components/LoadingSpinner';

export class CreateGroup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            title: ''
        };
        this.handleChange = formsOperations.handleChange.bind(this);
        this.createGroup = this.createGroup.bind(this);
    }

    createGroup(event) {
        event.preventDefault();
        this.props.actions.createGroupRequest(this.state)
    };

    render() {
        const {name, title} = this.state;
        const {loading} = this.props;

        return (
            <div className='create-group'>
                <h2>Create Group</h2>
                <div className='create-group--row'>
                    <div className='col-md-6'>
                        <h3>name</h3>
                        <input onChange={this.handleChange} value={name} name='name' className='form-control' type="text"/>
                        <h3>title</h3>
                        <input onChange={this.handleChange} value={title} name='title' className='form-control' type="text"/>
                    </div>

                    <button onClick={this.createGroup} className='create-group__send btn btn-outline-primary'>Send</button>
                </div>
                <LoadingSpinner loading={loading}/>
            </div>
        );
    }
}

CreateGroup.defaultProps = {
    createGroup: {},
    loading: false
};

CreateGroup.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(CreateGroup);

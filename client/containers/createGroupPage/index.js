import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import toastr from 'toastr';

import './index.scss';
import * as groupsActionCreators from '../../actions/action_creators/groups';
import {handleChangeState} from '../../services/formsOperations';
import {getErrorMessage} from '../../services/getErrorMessage';

class CreateGroup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            title: ''
        };
        this.handleChangeState = handleChangeState.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        const {error, groupCreated} = nextProps.createGroupStore;
        const errorMessage = getErrorMessage(nextProps.createGroupStore);

        error && toastr.error(errorMessage, 'Opps!');
        groupCreated && toastr.info('Group created', 'Ok!');
    }

    sendGroup = () => {
        this.props.actions.createGroupRequest(this.state)
    };

    render() {
        return (
            <div className='create-group'>
                <h2>Create Group</h2>
                <div className='create-group--row'>
                    <div className='col-md-6'>
                        <h3>name</h3>
                        <input onChange={this.handleChangeState} value={this.state.name} name='name' className='form-control' type="text"/>
                        <h3>title</h3>
                        <input onChange={this.handleChangeState} value={this.state.title} name='title' className='form-control' type="text"/>
                    </div>

                    <button onClick={this.sendGroup} className='create-group-send btn btn-outline-primary'>Send</button>
                </div>
            </div>
        );
    }
}

CreateGroup.propTypes = {
    createGroupStore: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    createGroupStore: state.createGroupReducer
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({
        ...groupsActionCreators
    }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateGroup);
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import toastr from 'toastr';

import './index.scss';
import * as createActionCreators from '../../actions/action_creators/create';
import {handleChangeForm} from '../../services/formsOperations';
import {getErrorMessage} from '../../services/getErrorMessage';

class CreateGroup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            title: ''
        };
        this.handleChangeForm = handleChangeForm.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        const {error, groupCreated} = nextProps.createStore;
        const errorMessage = getErrorMessage(nextProps.createStore);

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
                        <input onChange={this.handleChangeForm} value={this.state.name} name='name' className='form-control' type="text"/>
                        <h3>title</h3>
                        <input onChange={this.handleChangeForm} value={this.state.title} name='title' className='form-control' type="text"/>
                    </div>

                    <button onClick={this.sendGroup} className='create-group-send btn btn-outline-primary'>Send</button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    createStore: state.createReducer
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({
        ...createActionCreators
    }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateGroup);

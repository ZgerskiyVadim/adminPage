import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';

import './index.scss';
import * as groupsActionCreators from '../../actions/action_creators/groups';
import {handleChangeState} from '../../services/formsOperations';
import {toastrMessages} from '../../services/toastrMessages';
import LoadingSpinner from '../../components/loadingSpinner';

class CreateGroup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            title: '',
            loading: false
        };
        this.handleChangeState = handleChangeState.bind(this);
        this.sendGroup = this.sendGroup.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        const {loading} = nextProps.createGroupStore;
        this.setState({
            loading
        });

        toastrMessages(nextProps.createGroupStore);
    }

    sendGroup() {
        this.props.actions.createGroupRequest(this.state)
    };

    render() {
        const {loading, name, title} = this.state;

        return (
            <div className='create-group'>
                <h2>Create Group</h2>
                <div className='create-group--row'>
                    <div className='col-md-6'>
                        <h3>name</h3>
                        <input onChange={this.handleChangeState} value={name} name='name' className='form-control' type="text"/>
                        <h3>title</h3>
                        <input onChange={this.handleChangeState} value={title} name='title' className='form-control' type="text"/>
                    </div>

                    <button onClick={this.sendGroup} className='create-group__send btn btn-outline-primary'>Send</button>
                </div>
                <LoadingSpinner loading={loading}/>
            </div>
        );
    }
}

CreateGroup.propTypes = {
    createGroupStore: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    createGroupStore: state.CreateGroup
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({
        ...groupsActionCreators
    }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateGroup);

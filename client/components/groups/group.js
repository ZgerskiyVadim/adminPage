import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import * as actions from '../../actions/constants';
import { onChangeForm, showForms, getOptions } from '../../services/userAndGroupHelper';

class Group extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            name: '',
            title: '',
            id: ''
        };

        this.search = this.search.bind(this);
    }

    search(event) {
        this.props.search(event.target.value);
    }

    update() {
        this.setState({show: false});
        this.props.updateGroup(getOptions(this.state));
    }

    remove(id) {
        this.props.removeGroup(id);
    }

    render() {
        const hiddenForm = {display: this.state.show ? "block" : "none"};
        const shownForm = {display: !this.state.show ? "block" : "none"};

        return (
            <div className='group-row'>
                <div>
                    <Link to={`groups/${this.props.group._id}`}>{this.props.group.name}</Link>
                    <input onChange={onChangeForm.bind(this)} value={this.state.name} style={hiddenForm} name='name' type="text"/>
                </div>
                <div>
                    <Link to={`groups/${this.props.group._id}`}>{this.props.group.title}</Link>
                    <input onChange={onChangeForm.bind(this)} value={this.state.title} style={hiddenForm} name='title' type="text"/>
                </div>

                <button style={shownForm} onClick={showForms.bind(this, this.props.group._id)}>Update</button>
                <button style={hiddenForm} onClick={this.update.bind(this)}>Save</button>
                <button onClick={this.remove.bind(this, this.props.group._id)}>Remove</button>
            </div>
        );
    }
}

export default connect(
    state => ({
        stateStore: state
    }),
    dispatch => ({
        updateGroup: (options) => {
            dispatch({type: actions.UPDATE_GROUP_REQUEST, payload: options});
        },
        removeGroup: (id) => {
            dispatch({type: actions.REMOVE_GROUP_REQUEST, payload: id});
        }
    })
)(Group)
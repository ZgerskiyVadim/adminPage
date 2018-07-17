import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import * as actions from '../../actions/constants';

class Group extends Component {
    constructor(props) {
        super(props);

        this.search = this.search.bind(this);
    }

    search(event) {
        this.props.search(event.target.value);
    }

    update(id) {
        console.log('update id', id);
    }

    remove(id) {
        this.props.removeGroup(id);
    }

    render() {
        return (
            <div className='group-row'>
                <Link to={`groups/${this.props.group._id}`}>{this.props.group.name}</Link>
                <Link to={`groups/${this.props.group._id}`}>{this.props.group.title}</Link>
                <button onClick={this.update.bind(this, this.props.group._id)}>Update</button>
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
        removeGroup: (id) => {
            dispatch({type: actions.REMOVE_GROUP_REQUEST, payload: id});
        }
    })
)(Group)
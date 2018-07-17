import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import './index.scss';
import * as actions from '../../actions/constants';

class Groups extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getGroups();
    }

    search(event) {
        this.props.search(event.target.value);
    }

    update() {

    }

    remove(id) {
        this.props.removeGroup(id);
    }

    render() {
        return (
            <div>
                <h1>Search</h1>
                <input type="text" onChange={this.search.bind(this)}/>

                <div className='listGroups'>
                    <div className={'name'}>
                        <h1>name</h1>
                        {
                            this.props.stateStore.groupsReducer.map(item =>
                                <div key={item._id}>
                                    <Link to={`groups/${item._id}`}>
                                        <span>{item.name}</span>
                                    </Link>
                                </div>
                            )
                        }
                    </div>
                    <div className={'title'}>
                        <h1>title</h1>
                        {
                            this.props.stateStore.groupsReducer.map(item =>
                                <div key={item._id}>
                                    <Link to={`groups/${item._id}`}>
                                        <span>{item.title}</span>
                                    </Link>
                                </div>
                            )
                        }
                    </div>
                    <div className={'modification'}>
                        <h1>modification</h1>
                        {
                            this.props.stateStore.groupsReducer.map(item =>
                                <div key={item._id}>
                                    <button onClick={this.update.bind(this, item._id)}>Update</button>
                                    <button onClick={this.remove.bind(this, item._id)}>Remove</button>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(
    state => ({
        stateStore: state
    }),
    dispatch => ({
        getGroups: () => {
            dispatch({type: actions.GET_GROUPS_REQUEST});
        },
        search: (query) => {
            dispatch({type: actions.SEARCH_GROUPS_REQUEST, payload: query});
        },
        removeGroup: (id) => {
            dispatch({type: actions.REMOVE_GROUP_REQUEST, payload: id});
        }
    })
)(Groups)
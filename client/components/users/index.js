import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";

class Users extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.clearUsers();
        this.props.getUsers();
    }

    render() {
        return (
            <div>
                <ul>
                    {
                        this.props.stateStore.usersReducer.map((item, index) =>
                            <div key={index}>
                                <Link to={`users/${item._id}`}>
                                    <li>{item.username}</li>
                                </Link>
                            </div>
                        )
                    }
                </ul>
            </div>
        );
    }
}

export default connect(
    state => ({
        stateStore: state
    }),
    dispatch => ({
        getUsers: () => {
            dispatch({type: 'GET_USERS_REQUEST'});
        },
        clearUsers: () => {
            dispatch({type: 'CLEAR_STATE_USERS'});
        }
    })
)(Users)
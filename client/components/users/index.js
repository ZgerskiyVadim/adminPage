import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: []
        };
        console.log('props', props);
        console.log('this.props.stateStore', this.props.stateStore);
    }

    componentDidMount() {
        axios.get('users')
            .then(users => {
                this.props.getUsers(users.data);
                console.log('this.props.stateStore.usersReducer', this.props.stateStore.usersReducer);
                this.setState({ users: users.data });
            });
    }

    render() {
        return (
            <div>
                <ul>
                    {
                        this.state.users.map((item, index) =>
                            <div key={index}>
                                <li>{item.username}</li>
                                {/*<button onClick={this.handleRemove.bind(this, index)}>remove</button>*/}
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
        getUsers: (users) => {
            dispatch({type: 'GET_USERS', payload: users});
        }
    })
)(Users)
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Router, Link } from "react-router-dom";

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            term: '',
            items: []
        };
        console.log('props', props);
        console.log('this.props.stateStore', this.props.stateStore);
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('prevProps', prevProps);
        console.log('prevState', prevState);
        console.log('snapshot', snapshot);
    }
    render() {
        return (
            <div>
                <li><Link to='/api/users'>Users</Link></li>

                <ul>
                    {
                        this.props.stateStore.groupsReducer.map((item, index) =>
                            <div key={index}>
                                <li>{item}</li>
                                {/*<button onClick={this.handleRemove.bind(this, index)}>remove</button>*/}
                            </div>
                        )
                    }
                </ul>
                <ul>
                    {
                        this.props.stateStore.usersReducer.map((item, index) =>
                            <div key={index}>
                                <li>{item}</li>
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
        onAddNode: (textNode) => {
            dispatch({type: 'ADD_NODE', newNode: textNode});
        },
        removeNode: (nodeID) => {
            dispatch({type: 'REMOVE_NODE', nodeID})
        }
    })
)(Home)
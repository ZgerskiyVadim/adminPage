import React, { Component } from 'react';
import { connect } from 'react-redux';

class Groups extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.clearGroups();
        this.props.getGroups();
    }

    render() {
        return (
            <div>
                <ul>
                    {
                        this.props.stateStore.groupsReducer.map((item, index) =>
                            <div key={index}>
                                <li>{item.name}</li>
                            </div>)
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
        getGroups: () => {
            dispatch({type: 'GET_GROUPS_REQUEST'});
        },
        clearGroups: () => {
            dispatch({type: 'CLEAR_STATE_GROUPS'});
        }
    })
)(Groups)
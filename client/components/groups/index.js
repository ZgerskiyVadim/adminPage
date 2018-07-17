import React, { Component } from 'react';
import { connect } from 'react-redux';
import './index.scss';
import Group from './group';
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

    render() {
        return (
            <div>
                <h1>Search</h1>
                <input type="text" onChange={this.search.bind(this)}/>
                <div>
                    <div className='headers'>
                        <h1>name</h1>
                        <h1>title</h1>
                    </div>
                    {
                        this.props.stateStore.groupsReducer.map(group =>
                            <Group group={group} key={group._id}/>
                        )
                    }
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
        }
    })
)(Groups)
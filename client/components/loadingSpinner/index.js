import React, { Component } from 'react';
import './index.scss';
import classNames from 'classnames';
import {connect} from "react-redux";

class LoadingSpinner extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isShowSpinner: false
        }
    }

    componentWillReceiveProps(nextProps) {
        nextProps.state.groupsReducer.isLoading ?
            this.setState({
                isShowSpinner: true
            }) :
        this.setState({
            isShowSpinner: false
        }) ;
    }

    render() {
        return (
            <div className={classNames('cover', {'loader--hide': !this.state.isShowSpinner})}>
                <div className="loader"/>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    state
});

export default connect(mapStateToProps, null)(LoadingSpinner);
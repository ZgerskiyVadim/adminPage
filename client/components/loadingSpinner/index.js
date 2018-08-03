import React, { Component } from 'react';
import {createPortal} from "react-dom";
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
        return createPortal(
            <div className={classNames('cover', {'loader--hide': !this.state.isShowSpinner})}>
                <div className="loader"/>
            </div>,
            document.getElementById('portal')
        )
    }
}

const mapStateToProps = (state) => ({
    state
});

export default connect(mapStateToProps, null)(LoadingSpinner);
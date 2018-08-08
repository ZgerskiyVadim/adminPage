import React, { Component } from 'react';
import {createPortal} from "react-dom";
import './index.scss';
import classNames from 'classnames';

class LoadingSpinner extends Component {

    render() {
        const {loading} = this.props;
        return createPortal(
            <div className={classNames('cover', {'loader--hide': !loading})}>
                <div className="loader"/>
            </div>,
            document.getElementById('spinner')
        )
    }
}

export default LoadingSpinner;
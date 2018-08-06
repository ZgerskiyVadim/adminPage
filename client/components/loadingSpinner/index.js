import React, { Component } from 'react';
import {createPortal} from "react-dom";
import './index.scss';
import classNames from 'classnames';

class LoadingSpinner extends Component {

    render() {
        const {isLoading} = this.props;
        return createPortal(
            <div className={classNames('cover', {'loader--hide': !isLoading})}>
                <div className="loader"/>
            </div>,
            document.getElementById('portal')
        )
    }
}

export default LoadingSpinner;
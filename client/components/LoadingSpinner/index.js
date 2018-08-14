import React from 'react';
import {createPortal} from "react-dom";
import './index.scss';
import classNames from 'classnames';

const LoadingSpinner = (props) => {
    const {loading} = props;
    return createPortal(
        <div className={classNames('cover', {'loader--hide': !loading})}>
            <div className="loader"/>
        </div>,
        document.getElementById('spinner')
    )
};

export default LoadingSpinner;
import React from 'react';
import {createPortal} from "react-dom";
import PropTypes from 'prop-types';
import './index.scss';
import classNames from 'classnames';

const LoadingSpinner = ({loading}) => (
    createPortal(
        <div className={classNames('cover', {'loader--hide': !loading})}>
            <div className="loader"/>
        </div>,
        document.getElementById('spinner')
    )
);

LoadingSpinner.defaultProps = {
    loading: false
};

LoadingSpinner.propTypes = {
    loading: PropTypes.bool
};

export default LoadingSpinner;
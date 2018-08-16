import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import classNames from 'classnames';

const LoadingSpinner = ({loading}) => (
    <div className={classNames('cover', {'loader--hide': !loading})}>
        <div className="loader"/>
    </div>
);

LoadingSpinner.defaultProps = {
    loading: false
};

LoadingSpinner.propTypes = {
    loading: PropTypes.bool
};

export default LoadingSpinner;
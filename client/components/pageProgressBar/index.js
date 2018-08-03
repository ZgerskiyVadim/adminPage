import React, { Component } from 'react';
import './index.scss';
import classNames from 'classnames';

class LoadingExample extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='cover loader--hide'>
                <div className="loader"/>
            </div>
        )
    }
}

export default LoadingExample;
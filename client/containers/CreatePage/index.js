import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import './index.scss';

export default class CreatePage extends Component {
    render() {
        return (
            <div className='home'>
                <div className='home--row'>
                    <Link to='/create-user'><h2 className='home--margin-right'>Create user</h2></Link>
                    <Link to='/create-group'><h2>Create group</h2></Link>
                </div>
            </div>
        );
    }
}

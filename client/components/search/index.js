import React, { Component } from 'react';
import './index.scss';

class SearchComponent extends Component {

    render() {
        return (
            <div className='search'>
                <h2>Search</h2>
                <input onChange={this.props.search} className='form-control col-md-3' type="text"/>
                {
                    this.props.handleButtonClick ?
                        <button onClick={this.props.handleButtonClick} className={this.props.style}>Cancel join group</button> :
                        null
                }
            </div>
        )
    }
}

export default SearchComponent;
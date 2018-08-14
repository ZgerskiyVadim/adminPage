import React from 'react';
import './index.scss';

const SearchComponent = (props) => {
    const {search, style} = props;

    return (
        <div className='search'>
            <h2>Search</h2>
            <input onChange={search} className='form-control col-md-3' type="text"/>
            {
                props.handleButtonClick ?
                    <button onClick={props.handleButtonClick} className={style}>Cancel join group</button> :
                    null
            }
        </div>
    )
};

export default SearchComponent;
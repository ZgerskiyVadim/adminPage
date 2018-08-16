import React from 'react';
import './index.scss';

const SearchComponent = ({search, style, handleButtonClick}) => (
    <div className='search'>
        <h2>Search</h2>
        <input onChange={search} className='form-control col-md-3' type="text"/>
        {
            handleButtonClick ?
                <button onClick={handleButtonClick} className={style}>Cancel join group</button> :
                null
        }
    </div>
);

export default SearchComponent;
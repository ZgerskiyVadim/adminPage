import React from 'react';
import './index.scss';

const SearchComponent = ({search, style, handleButtonClick}) => (
    <div className='search'>
        <h3>Search</h3>
        <input onChange={search} className='form-control col-md-2' type="text"/>
        {
            handleButtonClick && <button onClick={handleButtonClick} className={style}>Cancel join group</button>
        }
    </div>
);

export default SearchComponent;
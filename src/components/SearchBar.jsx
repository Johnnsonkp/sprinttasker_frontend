import React from 'react'
import { Input } from "antd";
const { Search } = Input;

const SearchBar = ({handleSearchNote}) => {
    const onSearch = (value) => handleSearchNote(value);

    return (
        <div className="search">
            <Search
                placeholder="input search text"
                allowClear
                onSearch={onSearch}
                onChange={(e) => handleSearchNote(e.target.value)}
                style={{ width: "100%", maxWidth: "1020px", marginTop: '50px', marginBottom: '50px' }}
          />
        </div>
    )
}

export default SearchBar;
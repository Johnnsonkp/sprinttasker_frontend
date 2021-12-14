import React from 'react'
import { Input } from "antd";
const { Search } = Input;

const SearchBar = ({handleSearchNote}) => {
    const onSearch = (value) => handleSearchNote(value);

    return (
        <div className="search">
            <Search
                outline="none"
                bordered={false}
                placeholder="input search text"
                allowClear
                onSearch={onSearch}
                onChange={(e) => handleSearchNote(e.target.value)}
                style={{ width: "100%", maxWidth: "1020px", marginTop: '30px', marginBottom: '50px', borderRadius: '8px', border: '1px solid #fff', padding: '8px', background: '#fff' }}
          />
        </div>
    )
}

export default SearchBar;
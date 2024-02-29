import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";

const Search = ({onSearchChange}) => {

    const [search, setSearch] =useState(null);

    const handleOnChange = (seasrchData0) => {
        setSearch(searchData);
        
    }

    return (
        <AsyncPaginate
            placeholder="Search fo city"
            debounceTimeour={600}
            value={search}
            onChange={handleOnChange}
        />
    )
}

export default Search;
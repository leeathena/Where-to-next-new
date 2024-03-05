import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { GEO_API_URL, geoApiOptions } from '../../API/api';
import React from 'react';
import citiesByContinent from '../../cities.js';
import Select from 'react-select';

const Search = ({ onSearchChange }) => {
    const [search, setSearch] = useState(null);

    const loadOptions = async (inputValue) => {
        try {
            const response = await fetch(`${GEO_API_URL}/cities?minPopulation=100000&namePrefix=${inputValue}`, geoApiOptions);
            const data = await response.json();
            return {
                options: data.data.map((city) => ({
                    value: `${city.latitude} ${city.longitude}`,
                    label: `${city.name}, ${city.countryCode}`,
                })),
            };
        } catch (err) {
            console.error(err);
        }
    };

    const handleOnChange = (searchData) => {
        setSearch(searchData);
        onSearchChange(searchData);
    };

    return (
        <AsyncPaginate
            placeholder="Search for city"
            debounceTimeout={600}
            value={search}
            onChange={handleOnChange}
            loadOptions={loadOptions}
        />
    );
};

export default Search;

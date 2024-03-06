import React, { useState, useEffect } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { GEO_API_URL, geoApiOptions } from '../../API/api';

const Search = ({ onSearchChange }) => {
    const [search, setSearch] = useState(null);
    const [previouslySearchedCities, setPreviouslySearchedCities] = useState([]);

    useEffect(() => {
        // Load previously searched cities from local storage on component mount
        const cachedCities = localStorage.getItem('previously_searched_cities');
        if (cachedCities) {
            setPreviouslySearchedCities(JSON.parse(cachedCities));
        }
    }, []);

    const loadOptions = async (inputValue, loadedOptions, { page }) => {
        try {
            const response = await fetch(`${GEO_API_URL}/cities?minPopulation=100000&namePrefix=${inputValue}`, geoApiOptions);
            const data = await response.json();
            const options = data.data.map((city) => ({
                value: `${city.latitude} ${city.longitude}`,
                label: `${city.name}, ${city.countryCode}`,
            }));

            // Combine options from API with previously searched cities
            const combinedOptions = [
                ...options,
                ...previouslySearchedCities.map(city => ({
                    value: city.value,
                    label: city.label,
                }))
            ];

            return {
                options: combinedOptions,
                hasMore: data.hasNextPage,
                additional: {
                    page: page + 1,
                },
            };
        } catch (err) {
            console.error(err);
            return { options: [], hasMore: false };
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
            additional={{
                page: 1,
            }}
        />
    );
};

export default Search;

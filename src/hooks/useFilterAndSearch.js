import { useState, useEffect } from 'react';

export const useFilterAndSearch = (data, initialFilters = {}, excludeValues = []) => {
    const [searchText, setSearchText] = useState('');
    const [filters, setFilters] = useState(initialFilters);
    const [filteredData, setFilteredData] = useState(data);

    useEffect(() => {

        let result = [...data];

        Object.entries(filters).forEach(([key, value]) => {
            if (!excludeValues.includes(value)) {
                result = result.filter(item => item[key] === value);
            }
        });

        if (searchText.trim() !== '') {
            const searchLower = searchText.toLowerCase();
            result = result.filter(item =>
                item.name?.toLowerCase().includes(searchLower) ||
                item.email?.toLowerCase().includes(searchLower)
            );
        }

        setFilteredData(result);

    }, [data, filters, searchText, excludeValues]);

    return {
        filteredData,
        filters,
        searchText,
        setFilters,
        setSearchText
    };
};
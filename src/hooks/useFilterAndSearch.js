import { useState, useEffect } from 'react';

export const useFilterAndSearch = (data, initialFilters = {}, excludeValues = [], searchKeys) => {
    const [searchText, setSearchText] = useState('');
    const [filters, setFilters] = useState(initialFilters);
    const [filteredData, setFilteredData] = useState(data);

    useEffect(() => {

        let result = [...data];

        Object.entries(filters).forEach(([key, value]) => {

            if (excludeValues.includes(value)) return;

            if (key === 'rate') {

                if (value === '5StarWord') {
                    result = result.filter(item => Math.floor(item.rate) === 5);
                } else if (value === '4StarWord') {
                    result = result.filter(item => Math.floor(item.rate) === 4);
                } else if (value === 'lessThan4StarWord') {
                    result = result.filter(item => Math.floor(item.rate) <= 3);
                }

            }
            else {
                result = result.filter(item => item[key] === value);
            }

        });

        if (searchText.trim() !== '') {
            const searchLower = searchText.toLowerCase();
            result = result.filter(item =>
                searchKeys.some(key =>
                    item[key]?.toString().toLowerCase().includes(searchLower)
                )
            );
        }

        setFilteredData(result);

    }, [data, filters, searchText, excludeValues, searchKeys]);

    return {
        filteredData,
        filters,
        searchText,
        setFilters,
        setSearchText
    };
};
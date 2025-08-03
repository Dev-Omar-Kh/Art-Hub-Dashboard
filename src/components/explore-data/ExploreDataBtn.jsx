import React, { useEffect, useState } from 'react'
import * as XLSX from 'xlsx';
import { PiExportBold } from 'react-icons/pi';
import { useFetchQuery } from '../../hooks/useFetchQuery';
import SelectBtn from '../buttons/SelectBtn';

const exportOptions = [
    { value: 'excel', label: 'exportAsExcelWord' },
    { value: 'csv', label: 'exportAsCsvWord' },
    { value: 'json', label: 'exportAsJsonWord' },
];

export default function ExploreDataBtn({endpoint, dataFormat, queryName, fileName, getFullData = true, theParam}){

    const [fetchedData, setFetchedData] = useState(null);

    // ====== get-data ====== //

    const {data, isLoading, isError} = useFetchQuery([...queryName], `${endpoint}${getFullData ? '?limit=full' : theParam}`);

    useEffect(() => {

        if (data && dataFormat) {
            const keys = dataFormat.split('.');
            let value = data;
            for (const key of keys) {
                value = value?.[key];
            }

            if (value !== undefined) {
                setFetchedData(value);
            }
        }

    }, [data, dataFormat]);

    // ====== remove-empty-columns ====== //

    const processDataForExport = (data) => {

        if (!data || !Array.isArray(data) || data.length === 0) return [];

        const processedData = data.map(row => {

            const newRow = {...row};

            Object.keys(newRow).forEach(key => {
                const value = newRow[key];
                
                if (value !== null && value !== undefined && typeof value === 'object') {
                    if (Array.isArray(value)) {
                        newRow[key] = value.length > 0 ? JSON.stringify(value) : null;
                    } else {
                        const keys = Object.keys(value);
                        newRow[key] = keys.length > 0 ? JSON.stringify(value) : null;
                    }
                }
            });

            return newRow;

        });

        const emptyColumns = new Set();
        const allColumns = Object.keys(processedData[0] || {});

        allColumns.forEach(col => {

            const hasValue = processedData.some(row => {
                const value = row[col];
                return value !== null && value !== undefined && value !== '' && String(value).trim() !== '';
            });
            
            if (!hasValue) {
                emptyColumns.add(col);
            }

        });

        return processedData.map(row => {
            const newRow = {...row};
            emptyColumns.forEach(col => delete newRow[col]);
            return newRow;
        });

    };

    // ====== setup export functions ====== //

    const exportExcel = () => {

        if (!fetchedData) return;

        const wb = XLSX.utils.book_new();

        if (Array.isArray(fetchedData)) {
            const cleanData = processDataForExport(fetchedData);
            if (cleanData.length > 0) {
                const ws = XLSX.utils.json_to_sheet(cleanData);
                XLSX.utils.book_append_sheet(wb, ws, "البيانات");
            }
        } else if (typeof fetchedData === 'object' && fetchedData !== null) {
            let hasData = false;
            for (const [key, value] of Object.entries(fetchedData)) {
                if (Array.isArray(value) && value.length > 0) {
                    const cleanData = processDataForExport(value);
                    if (cleanData.length > 0) {
                        const ws = XLSX.utils.json_to_sheet(cleanData);
                        XLSX.utils.book_append_sheet(wb, ws, key.substring(0, 31)); // Excel sheet name limit
                        hasData = true;
                    }
                } else if (typeof value === 'object' && value !== null) {
                    const cleanData = processDataForExport([value]);
                    if (cleanData.length > 0) {
                        const ws = XLSX.utils.json_to_sheet(cleanData);
                        XLSX.utils.book_append_sheet(wb, ws, key.substring(0, 31));
                        hasData = true;
                    }
                }
            }
            
            // إذا لم توجد بيانات صالحة، أنشئ sheet فارغ
            if (!hasData) {
                const ws = XLSX.utils.json_to_sheet([{ message: "لا توجد بيانات للتصدير" }]);
                XLSX.utils.book_append_sheet(wb, ws, "البيانات");
            }
        } else {
            const ws = XLSX.utils.json_to_sheet([{ value: fetchedData }]);
            XLSX.utils.book_append_sheet(wb, ws, "البيانات");
        }

        if (wb.SheetNames.length === 0) {
            const ws = XLSX.utils.json_to_sheet([{ message: "لا توجد بيانات للتصدير" }]);
            XLSX.utils.book_append_sheet(wb, ws, "البيانات");
        }

        XLSX.writeFile(wb, `${fileName}.xlsx`);

    };

    const exportCSV = () => {

        if (!fetchedData) return;

        if (Array.isArray(fetchedData)) {
            const cleanData = processDataForExport(fetchedData);
            if (cleanData.length > 0) {
                const ws = XLSX.utils.json_to_sheet(cleanData);
                const wb = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
                XLSX.writeFile(wb, `${fileName}.csv`, { bookType: "csv" });
            }
        } else if (typeof fetchedData === 'object' && fetchedData !== null) {
            let csvContent = '';
            
            for (const [key, value] of Object.entries(fetchedData)) {
                csvContent += `\n=== ${key} ===\n\n`;
                
                if (Array.isArray(value) && value.length > 0) {
                    const cleanData = processDataForExport(value);
                    if (cleanData.length > 0) {
                        const headers = Object.keys(cleanData[0]);
                        csvContent += headers.join(',') + '\n';
                        
                        cleanData.forEach(row => {
                            const values = headers.map(header => {
                                const val = row[header];
                                if (val === null || val === undefined) return '';
                                const strVal = String(val);
                                if (strVal.includes(',') || strVal.includes('"') || strVal.includes('\n')) {
                                    return `"${strVal.replace(/"/g, '""')}"`;
                                }
                                return strVal;
                            });
                            csvContent += values.join(',') + '\n';
                        });
                    }
                } else if (typeof value === 'object' && value !== null) {
                    const cleanData = processDataForExport([value]);
                    if (cleanData.length > 0) {
                        const headers = Object.keys(cleanData[0]);
                        csvContent += headers.join(',') + '\n';
                        
                        cleanData.forEach(row => {
                            const values = headers.map(header => {
                                const val = row[header];
                                if (val === null || val === undefined) return '';
                                const strVal = String(val);
                                if (strVal.includes(',') || strVal.includes('"') || strVal.includes('\n')) {
                                    return `"${strVal.replace(/"/g, '""')}"`;
                                }
                                return strVal;
                            });
                            csvContent += values.join(',') + '\n';
                        });
                    }
                } else if (value !== null && value !== undefined) {
                    csvContent += `${key}\n${value}\n`;
                }
                
                csvContent += '\n';
            }
            
            if (csvContent.trim()) {
                const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
                const link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                link.download = `${fileName}.csv`;
                link.click();
                
                setTimeout(() => {
                    URL.revokeObjectURL(link.href);
                }, 100);
            } else {
                const ws = XLSX.utils.json_to_sheet([{ message: "لا توجد بيانات للتصدير" }]);
                const wb = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
                XLSX.writeFile(wb, `${fileName}.csv`, { bookType: "csv" });
            }
        } else {
            const ws = XLSX.utils.json_to_sheet([{ value: fetchedData }]);
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
            XLSX.writeFile(wb, `${fileName}.csv`, { bookType: "csv" });
        }

    };

    const exportJSON = () => {

        if (!fetchedData) return;

        const blob = new Blob([JSON.stringify(fetchedData, null, 2)], {
            type: "application/json",
        });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `${fileName}.json`;
        link.click();

        setTimeout(() => {
            URL.revokeObjectURL(link.href);
        }, 100);

    };

    const handleExport = (type) => {

        if (!fetchedData) {
            console.warn("لا توجد بيانات للتصدير");
            return;
        }

        switch (type) {
            case 'excel':
                exportExcel();
                break;
            case 'csv':
                exportCSV();
                break;
            case 'json':
                exportJSON();
                break;
            default:
                console.error("Unknown export type:", type);
        }
    }

    return <React.Fragment>

        <SelectBtn 
            icon={<PiExportBold />} 
            title={'exportDataWord'} 
            options={exportOptions} 
            handleClick={handleExport}
            disabled={isLoading || isError || !fetchedData}
        />

    </React.Fragment>

}
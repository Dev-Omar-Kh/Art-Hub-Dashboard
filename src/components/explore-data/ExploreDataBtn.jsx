import React, { useCallback, useEffect, useRef, useState } from 'react'
import * as XLSX from 'xlsx';
import { PiExportBold } from 'react-icons/pi';
import { useTranslation } from 'react-i18next';
import { IoIosArrowBack } from 'react-icons/io';
import { AnimatePresence, motion } from 'framer-motion';
import Animations from '../../animations/Animations';
import { useFetchQuery } from '../../hooks/useFetchQuery';

const exportOptions = [
    { value: 'excel', label: 'exportAsExcelWord' },
    { value: 'csv', label: 'exportAsCsvWord' },
    { value: 'json', label: 'exportAsJsonWord' },
];

export default function ExploreDataBtn({endpoint, dataFormat, queryName, fileName}){

    const {t} = useTranslation();

    const [displayOptions, setDisplayOptions] = useState(false);
    const [fetchedData, setFetchedData] = useState(null);
    const listRef = useRef(null);

    // ====== handle-list-button ====== //

    const handleClickOutside = useCallback((event) => {
    
        if (listRef.current && !listRef.current.contains(event.target)) {
            setDisplayOptions(false);
        }

    }, []);

    useEffect(() => {

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };

    }, [handleClickOutside]);

    // ====== get-data ====== //

    const {data, isLoading, isError} = useFetchQuery([queryName], `${endpoint}?limit=full`);

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

        if (!data || !Array.isArray(data) || data.length === 0) {
            return [];
        }

        const processedData = data.map(row => {

            const newRow = {...row};

            Object.keys(newRow).forEach(key => {
                const value = newRow[key];
                
                // لو القيمة object أو array، حولها لـ JSON string
                if (value !== null && value !== undefined && typeof value === 'object') {
                    if (Array.isArray(value)) {
                        // لو array فاضي، حطها null
                        newRow[key] = value.length > 0 ? JSON.stringify(value) : null;
                    } else {
                        // لو object فاضي، حطها null
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
        const cleanData = processDataForExport(fetchedData);
        const ws = XLSX.utils.json_to_sheet(cleanData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
        XLSX.writeFile(wb, `${fileName}.xlsx`);
    };

    const exportCSV = () => {
        const cleanData = processDataForExport(fetchedData);
        const ws = XLSX.utils.json_to_sheet(cleanData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
        XLSX.writeFile(wb, `${fileName}.csv`, { bookType: "csv" });
    };

    const exportJSON = () => {
        const blob = new Blob([JSON.stringify(fetchedData, null, 2)], {
            type: "application/json",
        });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `${fileName}.json`;
        link.click();
    };

    const handleExport = (type) => {

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

        setDisplayOptions(false);

    }

    return <React.Fragment>

        <div ref={listRef} className='relative'>

            <button 
                disabled={isLoading || isError}
                onClick={() => setDisplayOptions(!displayOptions)}
                className={`
                    px-5 py-2.5 flex items-center gap-2.5 rounded-md bg-[var(--dark-blue-color)]
                    text-xl font-medium text-[var(--white-color)]
                    ${isLoading || isError ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                `}
            >
                <PiExportBold />
                <p className='text-base'>{t('exportDataWord')}</p>
                <IoIosArrowBack className={`duration-300 ${displayOptions ? '-rotate-90' : ''}`} />
            </button>

            <AnimatePresence>
                {displayOptions && <motion.div
                    variants={Animations.displayList}
                    initial='hidden' animate='visible' exit={'exit'}
                    className='
                        absolute list-top start-0 w-full max-h-80 overflow-hidden rounded-md 
                        shadow-[0_0px_10px_var(--shadow-black-color)] bg-[var(--white-color)] 
                        border border-solid border-[var(--sky-blue-color)] z-20
                    '
                >

                    <ul className='w-full max-h-80 rounded-md overflow-auto'>

                        {exportOptions.map( (item, idx) => <li 
                            key={idx}
                            onClick={() => handleExport(item.value)}
                            className={`
                                w-full p-2.5 border-b border-solid border-[var(--sky-blue-color)] last:border-0 font-medium
                                text-[var(--dark-blue-color)] text-center duration-300 hover:bg-[var(--sky-blue-color)] cursor-pointer
                            `}
                        >{t(item.label)}</li>)}

                    </ul>

                </motion.div>}
            </AnimatePresence>

        </div>

    </React.Fragment>

}

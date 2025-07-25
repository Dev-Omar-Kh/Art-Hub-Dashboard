import React, { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { IoBanSharp } from 'react-icons/io5';
import { PiWarningOctagonBold } from 'react-icons/pi';
import MainTitle from '../../components/Titles/MainTitle';
import Table from '../../components/table/Table';
import Numbers from '../../hooks/useConvertNumber';
import { IoIosArrowForward } from 'react-icons/io';
import ElementBox from '../../components/elements-box/ElementBox';
import { useFilterAndSearch } from '../../hooks/useFilterAndSearch';
import SearchInput from '../../components/inputs/search-input/SearchInput';
import ListBtn from '../../components/buttons/ListBtn';
import PopUp from '../../components/pop-up/PopUp';
import { AnimatePresence } from 'framer-motion';
import PopUpDescription from '../../components/pop-up/pop-up-box/PopUpDescription';
import { useFetchQuery } from '../../hooks/useFetchQuery';
import { endpoints } from '../../constants/endPoints';
import PaginationList from '../../components/pagination-list/PaginationList';
import DeleteOperation from '../../components/delete-operation/DeleteOperation';
import ExploreDataBtn from '../../components/explore-data/ExploreDataBtn';

const tableData = {
    columns: ['complainantWord', 'artistWord', 'reportTypeWord', 'dateWord', 'reportDescriptionWord', 'statusWord', 'actionsWord'],
}

export default function Reports() {

    const {t, i18n} = useTranslation();

    // ====== get-table-data ====== //
    
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const main = document.querySelector('main.content-width');
        if (main) {
            main.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, [currentPage]);

    const {data, isLoading, isError} = useFetchQuery(
        ['reports', currentPage], 
        `${endpoints.reports.getReports}?page=${currentPage}&limit=10`
    );

    // ====== buttons-data ====== //

    const uniqueReportType = [...new Set(data?.data.reports.map(report => report.reportType))];
    const uniqueStatusType = [...new Set(data?.data.reports.map(report => report.statusText))];
    const listButtonsData = [

        {
            id: 1,
            data: [
                { value: 'allTypesWord', label: 'allTypesWord' },
                ...uniqueReportType.map(reportType => ({
                    value: reportType,
                    label: reportType
                }))
            ],
            key: 'reportType'
        },

        {
            id: 2,
            data: [
                { value: 'allStatusWord', label: 'allStatusWord' },
                ...uniqueStatusType.map(status => ({
                    value: status,
                    label: status
                }))
            ],
            key: 'statusText'
        },

    ];

    // ====== handle-filter-&-search-data ====== //

    const initialFilters = {
        type: 'allTypesWord',
        status: 'allStatusWord'
    };

    const excludeValues = useMemo(() => ['allTypesWord', 'allStatusWord'], []);
    const searchKeys  = useMemo(() => ['complainant', 'artist'], []);
    const {filteredData, setFilters, setSearchText} = useFilterAndSearch(
        data?.data.reports, initialFilters, excludeValues, searchKeys
    );

    // ====== handle-view-Report-button ====== //

    const [openReportPopUp, setOpenReportPopUp] = useState(false);
    const [reportMessage, setReportMessage] = useState(null);

    const showReport = (msg) => {
        setOpenReportPopUp(true);
        setReportMessage(msg);
    }

    // ====== handle-delete-row ====== //

    const [isOpen, setIsOpen] = useState(false);
    const [openCount, setOpenCount] = useState(0);
    const [itemId, setItemId] = useState(null);
    const handleDeleteRow = (item) => {
        setIsOpen(true);
        setItemId(item._id);
        setOpenCount(prev => prev + 1);
    }

    return <React.Fragment>

        <AnimatePresence>
            {openReportPopUp && <PopUp onClose={() => setOpenReportPopUp(false)}>
                <PopUpDescription title={'reportDescriptionWord'} msg={reportMessage} onClose={() => setOpenReportPopUp(false)} />
            </PopUp>}
        </AnimatePresence>

        {isOpen && <DeleteOperation key={openCount} method={'delete'}
            icon={<PiWarningOctagonBold />} iconColor={'var(--red-color)'}
            title={'deleteReportTitle'} msg={'deleteReportMsg'} 
            successMsg={'deleteReportSuccessMsg'} errorMsg={'deleteReportErrorMsg'}
            setIsOpen={setIsOpen} tableName={'reports'}
            endPoint={`${endpoints.reports.getReports}/${itemId}`} 
        />}

        <section className='w-full flex flex-col gap-10'>

            <MainTitle title={'reportsManageWord'} slogan={'reportsManagementPageSlogan'}>
                <ExploreDataBtn 
                    dataFormat={`data.reports`} fileName={'users-reports-data'}
                    endpoint={endpoints.reports.getReports} queryName={'exportReports'}
                />
            </MainTitle>

            <div className='w-full flex flex-wrap gap-5 items-center justify-between'>

                <div className='w-sm'>
                    <SearchInput 
                        id={'reportSearch'} placeholder={'reportSearchWord'} 
                        onSearch={(value) => setSearchText(value)}
                    />
                </div>

                <div className='flex flex-wrap items-center gap-2.5'>
                    {listButtonsData.map((list, idx) => (
                        <ListBtn 
                            key={idx} listData={list.data} filterKey={list.key} 
                            color={'var(--white-color)'} 
                            onFilterChange={(key, value) => setFilters(prev => ({ ...prev, [key]: value }))}
                        />
                    ))}
                </div>

            </div>

            <div className='w-full rounded-2xl bg-[var(--white-color)] overflow-hidden'>

                <Table data={filteredData}
                    columns={tableData.columns}
                    isLoading={isLoading} isError={isError}
                    emptyMsg={'notFoundReportsWord'}
                    actions={true} 
                    renderRow={(report) => (
                        <React.Fragment>

                            <td className='p-2.5 whitespace-nowrap'>
                                {report.complainant}
                            </td>

                            <td 
                                className={`
                                    ${i18n.language === 'en' ? 'border-l' : 'border-r'} 
                                    border-solid border-[var(--mid-gray-color)] p-2.5 whitespace-nowrap
                                `}
                            >
                                {report.artist}
                            </td>

                            <td 
                                className={`
                                    ${i18n.language === 'en' ? 'border-l' : 'border-r'} 
                                    border-solid border-[var(--mid-gray-color)] p-2.5 whitespace-nowrap
                                `}
                            >
                                {report.reportType}
                            </td>

                            <td 
                                className={`
                                    ${i18n.language === 'en' ? 'border-l' : 'border-r'} 
                                    border-solid border-[var(--mid-gray-color)] p-2.5 whitespace-nowrap
                                `}
                            >
                                {report.date.split('T')[0].split('-').map((item) => (
                                    Numbers(item, i18n.language, true)
                                )).reverse().join(' - ')}
                            </td>

                            <td 
                                className={`
                                    ${i18n.language === 'en' ? 'border-l' : 'border-r'} 
                                    border-solid border-[var(--mid-gray-color)] p-2.5 whitespace-nowrap
                                `}
                            >
                                <div className='flex items-center justify-center'>
                                    <button
                                        onClick={() => showReport(report.description)}
                                        className='
                                            px-2 py-1 flex items-center justify-center gap-1 cursor-pointer 
                                            text-[var(--dark-blue-color)] bg-[var(--sky-blue-color)] rounded-md
                                        '
                                    >
                                        <p>{t('viewReportWord')}</p>
                                        <IoIosArrowForward className={`${i18n.language === 'ar' ? 'rotate-y-180' : ''}`} />
                                    </button>
                                </div>
                            </td>

                            <td 
                                className={`
                                    ${i18n.language === 'en' ? 'border-l' : 'border-r'} 
                                    border-solid border-[var(--mid-gray-color)] p-2.5 whitespace-nowrap
                                `}
                            >
                                <ElementBox title={report.statusText} 
                                    bgColor={
                                        report.status === 'resolved' ? 'var(--light-green-color)'
                                        : report.status === 'pending' ? 'var(--light-yellow-color)'
                                        : 'var(--light-red-color)'
                                    } 
                                    color={
                                        report.status === 'resolved' ? 'var(--green-color)'
                                        : report.status === 'pending' ? 'var(--yellow-color)'
                                        : 'var(--red-color)'
                                    } 
                                />
                            </td>

                        </React.Fragment>
                    )}
                    onActionClick={(report) => (
                        <React.Fragment>

                            <div className='w-full flex items-center justify-center gap-2.5'>

                                <button 
                                    onClick={() => handleDeleteRow(report)}
                                    id={`banUser-${report.id}`}
                                    className='
                                            p-2.5 rounded-md bg-[var(--light-red-color)]
                                            text-[var(--red-color)] cursor-pointer duration-300
                                            hover:bg-[var(--red-color)] hover:text-[var(--white-color)]
                                    '
                                >
                                    <IoBanSharp />
                                </button>

                            </div>

                        </React.Fragment>
                    )}
                />

            </div>

            {data?.data?.pagination.pages > 1 && 
                <PaginationList data={data?.data?.pagination} currentPage={currentPage} setCurrentPage={setCurrentPage} />
            }

        </section>

    </React.Fragment>

}

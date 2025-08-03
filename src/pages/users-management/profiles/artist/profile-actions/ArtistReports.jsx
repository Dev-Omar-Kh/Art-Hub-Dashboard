import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useFilterAndSearch } from '../../../../../hooks/useFilterAndSearch';
import Numbers from '../../../../../hooks/useConvertNumber';
import Table from '../../../../../components/table/Table';
import ListBtn from '../../../../../components/buttons/ListBtn';
import ElementBox from '../../../../../components/elements-box/ElementBox';
import { IoBanSharp } from 'react-icons/io5';
import { IoIosArrowForward } from 'react-icons/io';
import { AnimatePresence } from 'framer-motion';
import PopUp from '../../../../../components/pop-up/PopUp';
import PopUpDescription from '../../../../../components/pop-up/pop-up-box/PopUpDescription';
import WarningBox from '../../../../../components/pop-up/warning-box/WarningBox';
import { PiWarningOctagonBold } from 'react-icons/pi';
import { useParams } from 'react-router-dom';
import { endpoints } from '../../../../../constants/endPoints';
import { useFetchQuery } from '../../../../../hooks/useFetchQuery';
import PaginationList from '../../../../../components/pagination-list/PaginationList';

const ordersData = {
    columns: ['complainantWord', 'reportTypeWord', 'dateWord', 'reportDescriptionWord', 'statusWord', 'actionsWord'],
    data: [
        {
            id: 1,
            complainant: 'منى سالم',
            artist: 'احمد محمد',
            reportType: 'تأخير في التسليم',
            description: 'اللوحة وصلت متأخرة جدًا عن الموعد المتفق عليه.',
            date: '20-1-2025',
            status: 'pendingWord'
        },

        {
            id: 2,
            complainant: 'ياسر فؤاد',
            artist: 'عمر خالد',
            reportType: 'جودة منخفضة',
            description: 'الخامة والجودة لا تتناسب مع السعر.',
            date: '12-11-2024',
            status: 'reviewedWord'
        },

        {
            id: 3,
            complainant: 'هدى إبراهيم',
            artist: 'ليلى علي',
            reportType: 'تواصل غير متاح',
            description: 'لم يتم الرد على استفساراتي أثناء التنفيذ.',
            date: '6-2-2025',
            status: 'resolvedWord'
        },

        {
            id: 4,
            complainant: 'زياد محسن',
            artist: 'سارة محمود',
            reportType: 'خدش في العمل',
            description: 'اللوحة تعرضت لتلف أثناء الشحن.',
            date: '23-3-2025',
            status: 'pendingWord'
        },

        {
            id: 5,
            complainant: 'ريهام عبد الله',
            artist: 'محمود حسن',
            reportType: 'ألوان غير مطابقة',
            description: 'الألوان المستخدمة لا تطابق النموذج المرسل.',
            date: '18-4-2025',
            status: 'rejectedWord'
        },
    ]
};

export default function ArtistReports() {

    const {id} = useParams();
    const {t, i18n} = useTranslation();

    // ====== get-artist-reports ====== //

    const [currentPage, setCurrentPage] = useState(1);
    const prevPage = useRef(currentPage);

    const {data, isLoading, isError} = useFetchQuery(
        ['artistReports', id, currentPage], 
        `${endpoints.artist.baseLink}/${id}/${endpoints.artist.reports}?page=${currentPage}&limit=10`
    );

    useEffect(() => {

        if (prevPage.current !== currentPage) {
            const main = document.querySelector('#ScrollTop');
            if (main) {
                main.scrollIntoView({ behavior: 'smooth' });
            }
        }

        prevPage.current = currentPage;

    }, [currentPage]);

    // ====== filter-data ====== //

    const uniqueStatuses = [...new Set(data?.data.reports.map(order => order.status))];
    const listData = {
        id: 1,
        data: [
                { value: 'allStatusWord', label: 'allStatusWord' },
                ...uniqueStatuses.map(status => ({
                    value: status,
                    label: status
                }))
            ],
        key: 'status'
    }

    const initialFilters = {
        status: 'allStatusWord'
    };

    const excludeValues = useMemo(() => ['allStatusWord'], []);
    const {filteredData, setFilters} = useFilterAndSearch(
        data?.data.reports, initialFilters, excludeValues
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

    const handleDeleteRow = () => {
        setIsOpen(true);
    }

    return <React.Fragment>

        <AnimatePresence>

            {openReportPopUp && <PopUp onClose={() => setOpenReportPopUp(false)}>
                <PopUpDescription title={'reportDescriptionWord'} msg={reportMessage} onClose={() => setOpenReportPopUp(false)} />
            </PopUp>}

            {isOpen && <PopUp onClose={() => setIsOpen(false)}>
                <WarningBox 
                    icon={<PiWarningOctagonBold />} 
                    title={'deleteReportTitle'} msg={'deleteReportMsg'} 
                    onClose={() => setIsOpen(false)}
                />
            </PopUp>}

        </AnimatePresence>

        <div className='w-full flex flex-col gap-5'>

            <div className='w-full flex flex-wrap items-center justify-between gap-5'>
            
                <h3 className='text-2xl font-semibold text-[var(--dark-blue-color)]'>{t('allReportsOnArtistWord')}</h3>

                <ListBtn 
                    listData={listData.data}  filterKey={listData.key} color={'var(--sky-blue-color)'}
                    onFilterChange={(key, value) => setFilters(prev => ({...prev, [key]: value}))}
                />

            </div>

            <div className='w-full rounded-2xl overflow-hidden'>

                <Table data={filteredData}
                    tHeadColor={'var(--light-gray-color)'}
                    isLoading={isLoading} isError={isError}
                    columns={ordersData.columns} actions={true}
                    emptyMsg={'noReportsYet'}
                    renderRow={(report) => (
                        <React.Fragment>

                            <td className='p-2.5 whitespace-nowrap'>
                                {report.reporter.displayName}
                            </td>

                            <td 
                                className={`
                                    ${i18n.language === 'en' ? 'border-l' : 'border-r'} 
                                    border-solid border-[var(--mid-gray-color)] p-2.5 whitespace-nowrap
                                `}
                            >
                                {'fake type'}
                            </td>

                            <td 
                                className={`
                                    ${i18n.language === 'en' ? 'border-l' : 'border-r'} 
                                    border-solid border-[var(--mid-gray-color)] p-2.5 whitespace-nowrap
                                `}
                            >
                                {report.createdAt.split('T')[0].split('-').map((item) => (
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
                                <ElementBox title={report.status} 
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
                <PaginationList 
                    data={data?.data?.pagination} darkBtns={true}
                    currentPage={currentPage} setCurrentPage={setCurrentPage} 
                    />
            }

        </div>

    </React.Fragment>

}

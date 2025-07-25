import React, { useEffect, useMemo, useState } from 'react'
import MainTitle from '../../components/Titles/MainTitle'
import { useTranslation } from 'react-i18next';
import { PiWarningOctagonBold } from 'react-icons/pi';
import Table from '../../components/table/Table';
import { GoStarFill } from 'react-icons/go';
import { IoIosArrowForward } from 'react-icons/io';
import { IoBanSharp } from 'react-icons/io5';
import { useFilterAndSearch } from '../../hooks/useFilterAndSearch';
import ListBtn from '../../components/buttons/ListBtn';
import PopUp from '../../components/pop-up/PopUp';
import { AnimatePresence } from 'framer-motion';
import PopUpDescription from '../../components/pop-up/pop-up-box/PopUpDescription';
import SearchInput from './../../components/inputs/search-input/SearchInput';
import Numbers from '../../hooks/useConvertNumber';
import { useFetchQuery } from '../../hooks/useFetchQuery';
import { endpoints } from '../../constants/endPoints';
import PaginationList from '../../components/pagination-list/PaginationList';
import DeleteOperation from '../../components/delete-operation/DeleteOperation';
import ExploreDataBtn from '../../components/explore-data/ExploreDataBtn';

import errorImg from '../../assets/images/not-found-img.jpeg';

const tableData = {
    columns: ['#', 'nameWord', 'clientWord', 'artistWord', 'rateWord', 'dateWord', 'commentWord', 'actionsWord'],
}

export default function RatesManagement() {

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
        ['rates', currentPage], 
        `${endpoints.rates.getRates}?page=${currentPage}&limit=10`
    );

    // ====== buttons-data ====== //

    const listButtonsData = [
        {
            id: 1,
            data: [
                {value: 'allRatesWord', label: 'allRatesWord'}, 
                {value: '5StarWord', label: '5StarWord'}, 
                {value: '4StarWord', label: '4StarWord'}, 
                {value: 'lessThan4StarWord', label: 'lessThan4StarWord'}
            ],
            key: 'rating'
        },
    ];

    // ====== handle-filter-&-search-data ====== //

    const initialFilters = {
        rate: 'allRatesWord',
    };

    const excludeValues = useMemo(() => ['allRatesWord'], []);
    const searchKeys  = useMemo(() => ['artworkTitle', 'artistName', 'clientName'], []);
    const {filteredData, setFilters, setSearchText} = useFilterAndSearch(
        data?.data.reviews, initialFilters, excludeValues, searchKeys
    );

    // ====== handle-view-comment-button ====== //

    const [openCommentPopUp, setOpenCommentPopUp] = useState(false);
    const [rateMessage, setRateMessage] = useState(null);

    const showComment = (msg) => {
        setOpenCommentPopUp(true);
        setRateMessage(msg);
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
            {openCommentPopUp && <PopUp onClose={() => setOpenCommentPopUp(false)}>
                <PopUpDescription title={'commentWord'} msg={rateMessage} onClose={() => setOpenCommentPopUp(false)} />
            </PopUp>}
        </AnimatePresence>

        {isOpen && <DeleteOperation key={openCount} method={'delete'}
            icon={<PiWarningOctagonBold />} iconColor={'var(--red-color)'}
            title={'deleteRateTitle'} msg={'deleteRateMsg'} 
            successMsg={'deleteRateSuccessMsg'} errorMsg={'deleteRateErrorMsg'}
            setIsOpen={setIsOpen} tableName={'rates'}
            endPoint={`${endpoints.rates.getRates}/${itemId}`} 
        />}

        <section className='w-full flex flex-col gap-10'>

            <MainTitle title={'ratesManageWord'} slogan={'ratesManagementPageSlogan'}>
                <ExploreDataBtn 
                    dataFormat={`data.reviews`} fileName={'users-rates-data'}
                    endpoint={endpoints.rates.getRates} queryName={'exportRates'}
                />
            </MainTitle>

            <div className='w-full flex flex-wrap gap-5 items-center justify-between'>

                <div className='w-sm'>
                    <SearchInput 
                        id={'orderSearch'} placeholder={'orderSearchWord'} 
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
                    emptyMsg={'notFountMatchingRatesWord'}
                    actions={true}
                    renderRow={(rate) => (
                        <React.Fragment>

                            <td className='p-2.5 whitespace-nowrap'>
                                {Numbers(rate.id, i18n.language)}
                            </td>

                            <td
                                className={`
                                    ${i18n.language === 'en' ? 'border-l' : 'border-r'} 
                                    border-solid border-[var(--mid-gray-color)] p-2.5 whitespace-nowrap
                                `}
                            >
                                <div className='w-fit flex items-center gap-2.5'>
                                    <img
                                        className='
                                            w-10 h-10 min-w-10 min-h-10 rounded-md object-cover 
                                            border border-[var(--dark-blue-color)]
                                        '
                                        src={rate.artworkImage} onError={(e) => e.target.src = errorImg}
                                        alt={`${rate.artworkTitle} image`} loading='lazy' 
                                    />
                                    <p>{rate.artworkTitle}</p>
                                </div>
                            </td>

                            <td 
                                className={`
                                    ${i18n.language === 'en' ? 'border-l' : 'border-r'} 
                                    border-solid border-[var(--mid-gray-color)] p-2.5 whitespace-nowrap
                                `}
                            >
                                {rate.clientName}
                            </td>

                            <td 
                                className={`
                                    ${i18n.language === 'en' ? 'border-l' : 'border-r'} 
                                    border-solid border-[var(--mid-gray-color)] p-2.5 whitespace-nowrap
                                `}
                            >
                                {rate.artistName}
                            </td>

                            <td 
                                className={`
                                    ${i18n.language === 'en' ? 'border-l' : 'border-r'} 
                                    border-solid border-[var(--mid-gray-color)] p-2.5 whitespace-nowrap
                                `}
                            >
                                <div className='w-full flex items-center justify-center gap-1'>
                                    <p className='font-semibold'>{Numbers(rate.rating, i18n.language)}</p>
                                    <GoStarFill className='text-sm text-[var(--yellow-color)]' />
                                </div>
                            </td>

                            <td 
                                className={`
                                    ${i18n.language === 'en' ? 'border-l' : 'border-r'} 
                                    border-solid border-[var(--mid-gray-color)] p-2.5 whitespace-nowrap
                                `}
                            >
                                {rate.date.split('T')[0].split('-').map((item) => (
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
                                        onClick={() => showComment(rate.comment)}
                                        className='
                                            px-2 py-1 flex items-center justify-center gap-1 cursor-pointer 
                                            text-[var(--dark-blue-color)] bg-[var(--sky-blue-color)] rounded-md
                                        '
                                    >
                                        <p>{t('viewCommentWord')}</p>
                                        <IoIosArrowForward className={`${i18n.language === 'ar' ? 'rotate-y-180' : ''}`} />
                                    </button>
                                </div>
                            </td>

                        </React.Fragment>
                    )}
                    onActionClick={(rate) => (
                        <React.Fragment>

                            <div className='w-full flex items-center justify-center gap-2.5'>

                                <button 
                                    onClick={() => handleDeleteRow(rate)}
                                    id={`banUser-${rate.id}`}
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

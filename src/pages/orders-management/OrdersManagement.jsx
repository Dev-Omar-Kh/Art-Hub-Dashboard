import React, { useEffect, useMemo, useState } from 'react';
import MainTitle from '../../components/Titles/MainTitle';
import { PiWarningOctagonBold } from 'react-icons/pi';
import Table from '../../components/table/Table';
import Numbers from '../../hooks/useConvertNumber';
import { useTranslation } from 'react-i18next';
import ElementBox from '../../components/elements-box/ElementBox';
import CurrencyImage from '../../components/currency/CurrencyImage';
import { IoBanSharp } from 'react-icons/io5';
import SearchInput from '../../components/inputs/search-input/SearchInput';
import { useFilterAndSearch } from '../../hooks/useFilterAndSearch';
import ListBtn from '../../components/buttons/ListBtn';
import { AnimatePresence } from 'framer-motion';
import PopUp from '../../components/pop-up/PopUp';
import { useFetchQuery } from '../../hooks/useFetchQuery';
import { endpoints } from '../../constants/endPoints';
import PaginationList from '../../components/pagination-list/PaginationList';
import PopUpDescription from '../../components/pop-up/pop-up-box/PopUpDescription';
import { IoIosArrowForward } from 'react-icons/io';
import DeleteOperation from '../../components/delete-operation/DeleteOperation';
import ExploreDataBtn from '../../components/explore-data/ExploreDataBtn';
import * as Yup from 'yup';

const tableData = {

    columns: [
        'typeWord', 'priceWord', 'orderDateWord', 'artistWord', 'recipientCustomerWord', 
        'orderDescriptionWord', 'statusWord', 'actionsWord'
    ],

}

const reasonInput = {
    id: 'cancellationReason',
    label: 'reasonWord',
    placeHolder: 'reasonPlaceHolder',
    type: 'text',
    isPassword: false,
}

export default function OrdersManagement() {

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
        ['orders', currentPage], 
        `${endpoints.orders.getOrders}?page=${currentPage}&limit=10`,
    );

    console.log(data?.data);

    // ====== buttons-data ====== //

    // const usersButtons = [
    //     {id: 2, title: 'exportDataWord', icon: <PiExportBold />, color: 'var(--white-color)', bgColor: 'var(--dark-blue-color)'},
    // ];

    const uniqueStatuses = [...new Set(data?.data.orders.map(user => user.status))];
    const listButtonsData = [

        {
            id: 2,
            data: [
                { value: 'allStatusWord', label: 'allStatusWord' },
                ...uniqueStatuses.map(status => ({
                    value: status,
                    label: status
                }))
            ],
            key: 'status'
        },

    ];

    // ====== handle-filter-&-search-data ====== //

    const initialFilters = {
        type: 'allArtistsWord',
        status: 'allStatusWord'
    };

    const excludeValues = useMemo(() => ['allArtistsWord', 'allStatusWord'], []);
    const searchKeys  = useMemo(() => ['requestType'], []);
    const {filteredData, setFilters, setSearchText} = useFilterAndSearch(
        data?.data.orders, initialFilters, excludeValues, searchKeys
    );

    // ====== handle-view-Order-button ====== //
    
    const [openOrderPopUp, setOpenOrderPopUp] = useState(false);
    const [orderMessage, setOrderMessage] = useState(null);

    const showOrder = (msg) => {
        setOpenOrderPopUp(true);
        setOrderMessage(msg);
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

    const formikConfig = {
        values: { cancellationReason: '' },
        validationSchema: Yup.object({
            cancellationReason: Yup.string()
                .min(3, t('reasonMinError'))
                .max(500, t('reasonMaxError'))
                .required(t('reasonRequiredError')),
        }),
    }

    return <React.Fragment>

        <AnimatePresence>
            {openOrderPopUp && <PopUp onClose={() => setOpenOrderPopUp(false)}>
                <PopUpDescription title={'orderDescriptionWord'} msg={orderMessage} onClose={() => setOpenOrderPopUp(false)} />
            </PopUp>}
        </AnimatePresence>

        {isOpen && <DeleteOperation key={openCount} method={'delete'}
            icon={<PiWarningOctagonBold />} iconColor={'var(--red-color)'}
            title={'deleteOrderTitle'} msg={'deleteOrderMsg'} 
            successMsg={'deleteOrderSuccessMsg'} errorMsg={'deleteOrderErrorMsg'}
            setIsOpen={setIsOpen} tableName={'orders'}
            endPoint={`${endpoints.orders.getOrders}/${itemId}`} 
            isInput={true} inputSetup={reasonInput} formikConfig={formikConfig}
        />}

        <section className='w-full flex flex-col gap-10'>

            <MainTitle title={'ordersManageWord'} slogan={'ordersManagementPageSlogan'}>
                <ExploreDataBtn 
                    dataFormat={`data.orders`} fileName={'orders-data'}
                    endpoint={endpoints.orders.getOrders} queryName={'exportOrders'}
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
                    emptyMsg={'notFoundMatchedOrdersMsg'}
                    actions={true}
                    renderRow={(order) => (
                        <React.Fragment>

                            <td className='p-2.5 whitespace-nowrap'>
                                {order.requestType}
                            </td>

                            <td 
                                className={`
                                    ${i18n.language === 'en' ? 'border-l' : 'border-r'} 
                                    border-solid border-[var(--mid-gray-color)] p-2.5 whitespace-nowrap
                                `}
                            >
                                <div className='w-full flex items-center justify-center gap-1'>
                                    {`${Numbers(order.price, i18n.language)}`}
                                    <CurrencyImage width={'w-3.5'} color='blue' />
                                </div>
                            </td>

                            <td 
                                className={`
                                    ${i18n.language === 'en' ? 'border-l' : 'border-r'} 
                                    border-solid border-[var(--mid-gray-color)] p-2.5 whitespace-nowrap
                                `}
                            >
                                {order.orderDate.split('T')[0].split('-').map((item) => (
                                    Numbers(item, i18n.language, true)
                                )).reverse().join(' - ')}
                            </td>

                            <td 
                                className={`
                                    ${i18n.language === 'en' ? 'border-l' : 'border-r'} 
                                    border-solid border-[var(--mid-gray-color)] p-2.5 whitespace-nowrap
                                `}
                            >
                                {order.artist.displayName}
                            </td>

                            <td 
                                className={`
                                    ${i18n.language === 'en' ? 'border-l' : 'border-r'} 
                                    border-solid border-[var(--mid-gray-color)] p-2.5 whitespace-nowrap
                                `}
                            >
                                {order.customer.displayName}
                            </td>

                            <td 
                                className={`
                                    ${i18n.language === 'en' ? 'border-l' : 'border-r'} 
                                    border-solid border-[var(--mid-gray-color)] p-2.5 whitespace-nowrap
                                `}
                            >
                                <div className='flex items-center justify-center'>
                                    <button
                                        onClick={() => showOrder(order.description)}
                                        className='
                                            px-2 py-1 flex items-center justify-center gap-1 cursor-pointer 
                                            text-[var(--dark-blue-color)] bg-[var(--sky-blue-color)] rounded-md
                                        '
                                    >
                                        <p>{t('viewDescriptionWord')}</p>
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
                                <ElementBox title={order.status} 
                                    bgColor={
                                        (order.status === 'مكتمل' || order.status === 'مقبول') ? 'var(--light-green-color)'
                                        : order.status === 'قيد التنفيذ' ? 'var(--light-yellow-color)'
                                        : order.status === 'قيد المراجعة' ? 'var(--sky-blue-color)'
                                        : order.status === 'قيد الانتظار' ? 'var(--light-gray-color)'
                                        : 'var(--light-red-color)'
                                    } 
                                    color={
                                        (order.status === 'مكتمل' || order.status === 'مقبول') ? 'var(--green-color)'
                                        : order.status === 'قيد التنفيذ' ? 'var(--yellow-color)'
                                        : order.status === 'قيد المراجعة' ? 'var(--dark-blue-color)'
                                        : order.status === 'قيد الانتظار' ? 'var(--gray-color)'
                                        : 'var(--red-color)'
                                    } 
                                />
                            </td>

                        </React.Fragment>
                    )}
                    onActionClick={(order) => (
                        <React.Fragment>

                            <div className='w-full flex items-center justify-center gap-2.5'>

                                <button 
                                    onClick={() => handleDeleteRow(order)}
                                    id={`banUser-${order.id}`}
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

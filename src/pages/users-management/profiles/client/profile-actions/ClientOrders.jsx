import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import ListBtn from '../../../../../components/buttons/ListBtn';
import { useFilterAndSearch } from '../../../../../hooks/useFilterAndSearch';
import Table from '../../../../../components/table/Table';
import Numbers from '../../../../../hooks/useConvertNumber';
import ElementBox from '../../../../../components/elements-box/ElementBox';
import { Link, useParams } from 'react-router-dom';
import { IoBanSharp } from 'react-icons/io5';
import { FiEdit } from 'react-icons/fi';
import CurrencyImage from '../../../../../components/currency/CurrencyImage';
import { AnimatePresence } from 'framer-motion';
import PopUp from '../../../../../components/pop-up/PopUp';
import WarningBox from '../../../../../components/pop-up/warning-box/WarningBox';
import { PiWarningOctagonBold } from 'react-icons/pi';
import { useFetchQuery } from '../../../../../hooks/useFetchQuery';
import { endpoints } from '../../../../../constants/endPoints';
import PaginationList from '../../../../../components/pagination-list/PaginationList';
import { IoIosArrowForward } from 'react-icons/io';
import PopUpDescription from '../../../../../components/pop-up/pop-up-box/PopUpDescription';
import * as Yup from 'yup';
import DeleteOperation from '../../../../../components/delete-operation/DeleteOperation';

const ordersData = {
    columns: ['theArtworkWord', 'theArtistWord', 'priceWord', 'dateWord', 'orderDescriptionWord', 'statusWord', 'actionsWord'],
};

const reasonInput = {
    id: 'cancellationReason',
    label: 'reasonWord',
    placeHolder: 'reasonPlaceHolder',
    type: 'text',
    isPassword: false,
}

export default function ClientOrders() {

    const {id} = useParams();
    const {t, i18n} = useTranslation();

    // ====== get-client-orders ======

    const [currentPage, setCurrentPage] = useState(1);
    const prevPage = useRef(currentPage);

    const {data, isLoading, isError} = useFetchQuery(
        ['clientOrders', id, currentPage], 
        `${endpoints.client.baseLink}/${id}/${endpoints.client.orders}?page=${currentPage}&limit=10`
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

    // ====== filter-data ======

    const ordersTableData = data?.data.orders;
    const uniqueStatuses = [...new Set(ordersTableData?.map(order => order.status))]
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
        ordersTableData, initialFilters, excludeValues
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

        <div className='w-full flex flex-col gap-5'>

            <div className='w-full flex flex-wrap items-center justify-between gap-5'>

                <h3 className='text-2xl font-semibold text-[var(--dark-blue-color)]'>{t('allClientOrders')}</h3>

                <ListBtn 
                    listData={listData.data}  filterKey={listData.key} color={'var(--sky-blue-color)'}
                    onFilterChange={(key, value) => setFilters(prev => ({...prev, [key]: value}))}
                />

            </div>

            <div className='w-full rounded-2xl overflow-hidden'>

                <Table data={filteredData}
                    tHeadColor={'var(--light-gray-color)'}
                    columns={ordersData.columns} actions={true}
                    isLoading={isLoading} isError={isError}
                    emptyMsg={'noOrdersYetWord'}
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
                                {order.artist.displayName}
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
                                {order.createdAt.split('T')[0].split('-').map((item) => (
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
                        <div className='w-full flex items-center justify-center gap-2.5'>

                            <button 
                                onClick={() => handleDeleteRow(order)}
                                id={`banOrder-${order.id}`}
                                className='
                                        p-2.5 rounded-md bg-[var(--light-red-color)]
                                        text-[var(--red-color)] cursor-pointer duration-300
                                        hover:bg-[var(--red-color)] hover:text-[var(--white-color)]
                                '
                            >
                                <IoBanSharp />
                            </button>

                        </div>
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

import React, { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import ListBtn from '../../../../../components/buttons/ListBtn';
import { useFilterAndSearch } from '../../../../../hooks/useFilterAndSearch';
import Table from '../../../../../components/table/Table';
import Numbers from '../../../../../services/convertNum';
import ElementBox from '../../../../../components/elements-box/ElementBox';
import { Link } from 'react-router-dom';
import { IoBanSharp } from 'react-icons/io5';
import { FiEdit } from 'react-icons/fi';
import CurrencyImage from '../../../../../components/currency/CurrencyImage';
import { AnimatePresence } from 'framer-motion';
import PopUp from '../../../../../components/pop-up/PopUp';
import WarningBox from '../../../../../components/pop-up/warning-box/WarningBox';
import { PiWarningOctagonBold } from 'react-icons/pi';

const ordersData = {
    columns: ['orderNumWord', 'theArtworkWord', 'theArtistWord', 'priceWord', 'dateWord', 'statusWord', 'actionsWord'],
    data: [
        {id: 1, title: 'لوحة زيتية مخصصة', artist: 'احمد محمد', date: '18-1-2025', price: '850', status: 'completedWord'},
        {id: 2, title: 'لوحة مائية حديثة', artist: 'عمر خالد', date: '10-11-2024', price: '1180', status: 'rejectedWord'},
        {id: 3, title: 'رسم بالفحم لمنظر طبيعي', artist: 'ليلى علي', date: '5-2-2025', price: '990', status: 'progressWord'},
        {id: 4, title: 'بورتريه كلاسيكي', artist: 'سارة محمود', date: '22-3-2025', price: '1250', status: 'completedWord'},
        {id: 5, title: 'لوحة تجريدية ملونة', artist: 'محمود حسن', date: '17-4-2025', price: '1075', status: 'completedWord'},
        {id: 6, title: 'رسم رقمي لمدينة', artist: 'نورا إبراهيم', date: '9-5-2025', price: '890', status: 'rejectedWord'},
        {id: 7, title: 'منظر بحري هادئ', artist: 'كريم مصطفى', date: '1-6-2025', price: '1130', status: 'progressWord'},
    ]
};

export default function ClientOrders() {

    const {t, i18n} = useTranslation();

    const uniqueStatuses = [...new Set(ordersData.data.map(order => order.status))]
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
        ordersData.data, initialFilters, excludeValues
    );

    // ====== handle-delete-row ====== //

    const [isOpen, setIsOpen] = useState(false);

    const handleDeleteRow = () => {
        setIsOpen(true);
    }

    return <React.Fragment>

        <AnimatePresence>
            {isOpen && <PopUp onClose={() => setIsOpen(false)}>
                <WarningBox 
                    icon={<PiWarningOctagonBold />} 
                    title={'deleteOrderTitle'} msg={'deleteOrderMsg'} 
                    onClose={() => setIsOpen(false)}
                />
            </PopUp>}
        </AnimatePresence>

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
                    renderRow={(order) => (
                        <React.Fragment>

                            <td className='p-2.5 whitespace-nowrap'>
                                {`${Numbers(order.id, i18n.language, true)} #`}
                            </td>

                            <td 
                                className={`
                                    ${i18n.language === 'en' ? 'border-l' : 'border-r'} 
                                    border-solid border-[var(--mid-gray-color)] p-2.5 whitespace-nowrap
                                `}
                            >
                                {order.title}
                            </td>

                            <td 
                                className={`
                                    ${i18n.language === 'en' ? 'border-l' : 'border-r'} 
                                    border-solid border-[var(--mid-gray-color)] p-2.5 whitespace-nowrap
                                `}
                            >
                                {order.artist}
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
                                {order.date.split('-').map((item) => (
                                    Numbers(item, i18n.language, true)
                                )).reverse().join(' - ')}
                            </td>

                            <td 
                                className={`
                                    ${i18n.language === 'en' ? 'border-l' : 'border-r'} 
                                    border-solid border-[var(--mid-gray-color)] p-2.5 whitespace-nowrap
                                `}
                            >
                                <ElementBox title={order.status} 
                                    bgColor={
                                        order.status === 'completedWord' ? 'var(--light-green-color)'
                                        : order.status === 'progressWord' ? 'var(--light-yellow-color)'
                                        : 'var(--light-red-color)'
                                    } 
                                    color={
                                        order.status === 'completedWord' ? 'var(--green-color)'
                                        : order.status === 'progressWord' ? 'var(--yellow-color)'
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

        </div>

    </React.Fragment>

}

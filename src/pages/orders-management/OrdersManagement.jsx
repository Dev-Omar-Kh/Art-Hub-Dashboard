import React, { useMemo, useState } from 'react';
import MainTitle from '../../components/Titles/MainTitle';
import { PiExportBold, PiWarningOctagonBold } from 'react-icons/pi';
import Table from '../../components/table/Table';
import Numbers from '../../services/convertNum';
import { useTranslation } from 'react-i18next';

// ====== import-images ====== //

import orderImg from '../../assets/images/product-1.jpg';
import ElementBox from '../../components/elements-box/ElementBox';
import CurrencyImage from '../../components/currency/CurrencyImage';
import { IoBanSharp } from 'react-icons/io5';
import SearchInput from '../../components/inputs/search-input/SearchInput';
import { useFilterAndSearch } from '../../hooks/useFilterAndSearch';
import ListBtn from '../../components/buttons/ListBtn';
import { AnimatePresence } from 'framer-motion';
import PopUp from '../../components/pop-up/PopUp';
import WarningBox from '../../components/pop-up/warning-box/WarningBox';

const tableData = {

    columns: ['#', 'nameWord', 'priceWord', 'orderDateWord', 'artistWord', 'recipientCustomerWord', 'statusWord', 'actionsWord'],

    data: [

        { 
            id: 1, 
            title: 'لوحة زيتية مخصصة', 
            price: '850', 
            date: '18-1-2025', 
            artist: 'أحمد محمد', 
            recipientCustomer: 'منى سالم', 
            status: 'completedWord' 
        },

        { 
            id: 2, 
            title: 'لوحة مائية حديثة', 
            price: '1180', 
            date: '10-11-2024', 
            artist: 'عمر خالد', 
            recipientCustomer: 'ياسر فؤاد', 
            status: 'rejectedWord' 
        },

        { 
            id: 3, 
            title: 'رسم بالفحم لمنظر طبيعي', 
            price: '990', 
            date: '5-2-2025', 
            artist: 'ليلى علي', 
            recipientCustomer: 'هدى إبراهيم', 
            status: 'progressWord' 
        },

        { 
            id: 4, 
            title: 'بورتريه كلاسيكي', 
            price: '1250', 
            date: '22-3-2025', 
            artist: 'سارة محمود', 
            recipientCustomer: 'زياد محسن', 
            status: 'completedWord' 
        },

        { 
            id: 5, 
            title: 'لوحة تجريدية ملونة', 
            price: '1075', 
            date: '17-4-2025', 
            artist: 'محمود حسن', 
            recipientCustomer: 'ريهام عبد الله', 
            status: 'completedWord' 
        },

        { 
            id: 6, 
            title: 'رسم رقمي لمدينة', 
            price: '890', 
            date: '9-5-2025', 
            artist: 'نورا إبراهيم', 
            recipientCustomer: 'عماد مصطفى', 
            status: 'rejectedWord' 
        },

        { 
            id: 7, 
            title: 'منظر بحري هادئ', 
            price: '1130', 
            date: '1-6-2025', 
            artist: 'كريم مصطفى', 
            recipientCustomer: 'مروان خليل', 
            status: 'progressWord' 
        },

        { 
            id: 8, 
            title: 'لوحة بانورامية للصحراء', 
            price: '960', 
            date: '12-6-2025', 
            artist: 'هدى عصام', 
            recipientCustomer: 'شهد مجدي', 
            status: 'completedWord' 
        },

        { 
            id: 9, 
            title: 'لوحة بألوان الباستيل', 
            price: '780', 
            date: '28-6-2025', 
            artist: 'ياسر أحمد', 
            recipientCustomer: 'نهى طارق', 
            status: 'progressWord' 
        },

        { 
            id: 10, 
            title: 'رسم تعبيري بالحبر', 
            price: '1040', 
            date: '5-7-2025', 
            artist: 'أميرة سامي', 
            recipientCustomer: 'سليم حسن', 
            status: 'completedWord' 
        },

        { 
            id: 11, 
            title: 'لوحة بورتريه عصري', 
            price: '1150', 
            date: '19-7-2025', 
            artist: 'حسن علاء', 
            recipientCustomer: 'أحمد يونس', 
            status: 'rejectedWord' 
        },

        { 
            id: 12, 
            title: 'منظر جبلي هادئ', 
            price: '990', 
            date: '30-7-2025', 
            artist: 'نجلاء عبد الحليم', 
            recipientCustomer: 'مها جمال', 
            status: 'completedWord' 
        },

        { 
            id: 13, 
            title: 'لوحة خيالية ساحرة', 
            price: '1220', 
            date: '9-8-2025', 
            artist: 'رامي السيد', 
            recipientCustomer: 'فاطمة حسين', 
            status: 'progressWord' 
        },

        { 
            id: 14, 
            title: 'فن تجريدي بالأسود والأبيض', 
            price: '870', 
            date: '23-8-2025', 
            artist: 'إيمان خالد', 
            recipientCustomer: 'ليلى سمير', 
            status: 'rejectedWord' 
        },

        { 
            id: 15, 
            title: 'لوحة رومانسية بألوان دافئة', 
            price: '1110', 
            date: '2-9-2025', 
            artist: 'طارق عبد الله', 
            recipientCustomer: 'سارة شكري', 
            status: 'completedWord' 
        },

    ]

}

export default function OrdersManagement() {

    const {i18n} = useTranslation();

    // ====== buttons-data ====== //

    const usersButtons = [
        {id: 2, title: 'exportDataWord', icon: <PiExportBold />, color: 'var(--white-color)', bgColor: 'var(--dark-blue-color)'},
    ];

    const uniqueStatuses = [...new Set(tableData.data.map(user => user.status))];
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
    const searchKeys  = useMemo(() => ['title'], []);
    const {filteredData, setFilters, setSearchText} = useFilterAndSearch(
        tableData.data, initialFilters, excludeValues, searchKeys
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

        <section className='w-full flex flex-col gap-10'>

            <MainTitle title={'ordersManageWord'} slogan={'ordersManagementPageSlogan'} buttons={usersButtons} />

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
                    actions={true}
                    renderRow={(order) => (
                        <React.Fragment>

                            <td className='p-2.5 whitespace-nowrap'>
                                {Numbers(order.id, i18n.language)}
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
                                        src={orderImg} alt={`${order.title} image`} loading='lazy' 
                                    />
                                    <p>{order.title}</p>
                                </div>
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
                                {order.artist}
                            </td>

                            <td 
                                className={`
                                    ${i18n.language === 'en' ? 'border-l' : 'border-r'} 
                                    border-solid border-[var(--mid-gray-color)] p-2.5 whitespace-nowrap
                                `}
                            >
                                {order.recipientCustomer}
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

        </section>

    </React.Fragment>

}

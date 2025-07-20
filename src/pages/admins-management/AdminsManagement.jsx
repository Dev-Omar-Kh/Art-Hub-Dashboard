import React, { useMemo, useState } from 'react'
import MainTitle from '../../components/Titles/MainTitle'
import { PiExportBold, PiWarningOctagonBold } from 'react-icons/pi'
import SearchInput from '../../components/inputs/search-input/SearchInput'
import ListBtn from '../../components/buttons/ListBtn';
import Table from '../../components/table/Table';
import { useTranslation } from 'react-i18next';
import Numbers from '../../services/convertNum';
import { Link } from 'react-router-dom';
import { IoIosAddCircleOutline, IoIosArrowForward } from 'react-icons/io';
import { IoBanSharp } from 'react-icons/io5';
import { LuMessageSquareText } from 'react-icons/lu';
import { ROUTES } from '../../constants/routes';
import ElementBox from '../../components/elements-box/ElementBox';
import { useFilterAndSearch } from '../../hooks/useFilterAndSearch';

// ====== import-images ====== //

import userPfp from '../../assets/images/artist.jpg';
import { FiEdit } from 'react-icons/fi';
import PopUp from './../../components/pop-up/PopUp';
import WarningBox from '../../components/pop-up/warning-box/WarningBox';
import { AnimatePresence } from 'framer-motion';

const tableData = {

    columns: ['nameWord', 'typeWord', 'emailWord', 'statusWord', 'joinDateWord', 'profileWord', 'actionsWord'],

    data: [
        {
            "_id": "6878e6893ef4f024984b2566",
            "displayName": "أحمد محمد",
            "email": "newadmin@example.com",
            "role": "admin",
            "isActive": true,
            "createdAt": "2025-07-17T12:03:21.465Z",
            "lastActive": "2025-07-17T12:31:59.453Z"
        },

        {
            "_id": "6878e62c75151acf7f3a4898",
            "displayName": "مدير النظام 1",
            "email": "hamz922003@gmail.com",
            "role": "superadmin",
            "isActive": true,
            "createdAt": "2025-07-17T12:01:49.003Z",
            "lastActive": "2025-07-18T13:28:01.863Z"
        },

        {
            "_id": "6878e6903ef4f024984b2567",
            "displayName": "مروان عبد الله",
            "email": "marwan@example.com",
            "role": "admin",
            "isActive": true,
            "createdAt": "2025-07-16T10:10:10.100Z",
            "lastActive": "2025-07-18T14:20:30.000Z"
        },

        {
            "_id": "6878e6913ef4f024984b2568",
            "displayName": "سارة مصطفى",
            "email": "sara.m@example.com",
            "role": "admin",
            "isActive": true,
            "createdAt": "2025-07-15T09:15:20.000Z",
            "lastActive": "2025-07-18T12:10:00.000Z"
        },

        {
            "_id": "6878e6923ef4f024984b2569",
            "displayName": "محمد أشرف",
            "email": "ashraf.m@example.com",
            "role": "superadmin",
            "isActive": true,
            "createdAt": "2025-07-12T14:25:40.000Z",
            "lastActive": "2025-07-18T15:00:00.000Z"
        },

        {
            "_id": "6878e6933ef4f024984b2570",
            "displayName": "إيمان علي",
            "email": "eman.ali@example.com",
            "role": "admin",
            "isActive": true,
            "createdAt": "2025-07-10T08:45:30.000Z",
            "lastActive": "2025-07-18T11:20:00.000Z"
        },

        {
            "_id": "6878e6943ef4f024984b2571",
            "displayName": "حسن عبد الكريم",
            "email": "hassan.k@example.com",
            "role": "superadmin",
            "isActive": true,
            "createdAt": "2025-07-09T07:00:00.000Z",
            "lastActive": "2025-07-18T10:00:00.000Z"
        },

        {
            "_id": "6878e6953ef4f024984b2572",
            "displayName": "ليلى حسن",
            "email": "leila.h@example.com",
            "role": "admin",
            "isActive": true,
            "createdAt": "2025-07-08T12:30:00.000Z",
            "lastActive": "2025-07-18T16:15:00.000Z"
        },

        {
            "_id": "6878e6963ef4f024984b2573",
            "displayName": "كريم سعيد",
            "email": "karim.s@example.com",
            "role": "admin",
            "isActive": true,
            "createdAt": "2025-07-07T10:10:10.000Z",
            "lastActive": "2025-07-18T13:45:00.000Z"
        },

        {
            "_id": "6878e6973ef4f024984b2574",
            "displayName": "نجلاء محمود",
            "email": "naglaa.m@example.com",
            "role": "superadmin",
            "isActive": true,
            "createdAt": "2025-07-06T11:20:30.000Z",
            "lastActive": "2025-07-18T14:30:00.000Z"
        }
    ]


};

const usersButtons = [
    {
        id: 1, 
        url: ROUTES.ADD_ADMIN_ROUTE,
        title: 'addAdminWord', 
        icon: <IoIosAddCircleOutline/>, 
        color: 'var(--white-color)', 
        bgColor: 'var(--dark-blue-color)'
    },
];

export default function AdminsManagement() {

    const { t, i18n } = useTranslation();

    const uniqueRoles = [...new Set(tableData.data.map(user => user.role))];
    const uniqueStatuses = [...new Set(tableData.data.map(user => user.isActive))];
    const listButtonsData = [

        {
            id: 1,
            data: [
                { value: 'allUsersWord', label: 'allUsersWord' },
                ...uniqueRoles.map(role => ({
                    value: role,
                    label: role === 'admin' ? 'adminWord' : 
                        role === 'superadmin' ? 'superadminWord' : 
                        role
                }))
            ],
            key: 'role'
        },
        {
            id: 2,
            data: [
                { value: 'allStatusWord', label: 'allStatusWord' },
                ...uniqueStatuses.map(status => ({
                    value: status,
                    label: status === true ? 'activeWord' : 'inactiveWord',
                })),
            ],
            key: 'lastActive'
        }

    ];

    // ====== handle-filter-&-search-data ====== //

    const initialFilters = {
        type: 'allUsersWord',
        status: 'allStatusWord'
    };

    const excludeValues = useMemo(() => ['allUsersWord', 'allStatusWord'], []);
    const searchKeys  = useMemo(() => ['displayName', 'email'], []);
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
                    title={'deleteAdminTitle'} msg={'deleteAdminMsg'} 
                    onClose={() => setIsOpen(false)}
                />
            </PopUp>}
        </AnimatePresence>

        <section className='w-full flex flex-col gap-10'>

            <MainTitle title={'adminsManageWord'} slogan={'adminManagementPageSlogan'} buttons={usersButtons} />

            <div className='w-full flex flex-wrap gap-5 items-center justify-between'>

                <div className='w-sm'>
                    <SearchInput 
                        id={'userSearch'} placeholder={'usersSearchWord'} 
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
                    renderRow={(user) => (
                        <React.Fragment>

                            <td className='p-2.5 whitespace-nowrap'>
                                <div className='w-fit flex items-center gap-2.5'>
                                    <img
                                        className='
                                            w-10 h-10 min-w-10 min-h-10 rounded-full object-cover 
                                            border border-[var(--dark-blue-color)]
                                        '
                                        src={userPfp} alt={`${user.name} image`} loading='lazy' 
                                    />
                                    <p>{user.displayName}</p>
                                </div>
                            </td>

                            <td 
                                className={`
                                    ${i18n.language === 'en' ? 'border-l' : 'border-r'} 
                                    border-solid border-[var(--mid-gray-color)] p-2.5 whitespace-nowrap
                                `}
                            >
                                <ElementBox 
                                    title={user.role.toLowerCase() === 'admin' ? 'adminWord' : 'superadminWord'} 
                                    bgColor={user.role.toLowerCase() === 'admin' ? 'var(--sky-blue-color)' : 'var(--mid-blue-color)'} 
                                    color={'var(--dark-blue-color)'} 
                                />
                            </td>

                            <td 
                                className={`
                                    ${i18n.language === 'en' ? 'border-l' : 'border-r'} 
                                    border-solid border-[var(--mid-gray-color)] p-2.5 whitespace-nowrap
                                `}
                            >
                                {user.email}
                            </td>

                            <td 
                                className={`
                                    ${i18n.language === 'en' ? 'border-l' : 'border-r'} 
                                    border-solid border-[var(--mid-gray-color)] p-2.5 whitespace-nowrap
                                `}
                            >
                                <ElementBox 
                                    title={user.isActive ? 'activeWord' : 'bannedWord'} 
                                    color={user.isActive === 'bannedWord' ? 'var(--red-color)' : 'var(--green-color)'} 
                                    bgColor={user.isActive === 'bannedWord' ? 'var(--light-red-color)' : 'var(--light-green-color)'} 
                                />
                            </td>

                            <td 
                                className={`
                                    ${i18n.language === 'en' ? 'border-l' : 'border-r'} 
                                    border-solid border-[var(--mid-gray-color)] p-2.5 whitespace-nowrap
                                `}
                            >
                                {user.createdAt.split('T')[0].split('-').map((item) => (
                                    Numbers(item, i18n.language, true)
                                )).join(' - ')}
                            </td>

                            <td 
                                className={`
                                    ${i18n.language === 'en' ? 'border-l' : 'border-r'} 
                                    border-solid border-[var(--mid-gray-color)] p-2.5 whitespace-nowrap
                                `}
                            >
                                <div className='flex items-center justify-center'>
                                    <Link 
                                        to={`${ROUTES.ADMIN_ROUTE}/${user._id}`}
                                        className='
                                            px-2 py-1 flex items-center justify-center gap-1 cursor-pointer 
                                            text-[var(--dark-blue-color)] bg-[var(--mid-blue-color)] rounded-md
                                        '
                                    >
                                        <p>{t('viewProfileWord')}</p>
                                        <IoIosArrowForward className={`${i18n.language === 'ar' ? 'rotate-y-180' : ''}`} />
                                    </Link>
                                </div>
                            </td>

                        </React.Fragment>
                    )}
                    onActionClick={(user) => (
                        <div className='w-full flex items-center justify-center gap-2.5'>

                            <Link 
                                to={`${ROUTES.SEND_MESSAGE_ROUTE}/${user.userId}`} 
                                className='
                                    p-2.5 rounded-md bg-[var(--sky-blue-color)]
                                    text-[var(--dark-blue-color)] cursor-pointer duration-300
                                '
                            >
                                <FiEdit />
                            </Link>

                            <button 
                                onClick={() => handleDeleteRow(user)}
                                id={`banUser-${user.id}`}
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

        </section>

    </React.Fragment>

}
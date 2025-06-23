import React, { useEffect, useState } from 'react'
import MainTitle from '../../components/Titles/MainTitle'
import { PiExportBold } from 'react-icons/pi'
import SearchInput from '../../components/inputs/search-input/SearchInput'
import ListBtn from '../../components/buttons/ListBtn';
import Table from '../../components/table/Table';
import { useTranslation } from 'react-i18next';

// ====== import-images ====== //

import userPfp from '../../assets/images/artist.jpg';
import Numbers from '../../services/convertNum';
import { Link } from 'react-router-dom';
import { IoIosArrowForward } from 'react-icons/io';
import { IoBanSharp } from 'react-icons/io5';

const tableData = {

    columns: ['nameWord', 'typeWord', 'emailWord', 'statusWord', 'joinDateWord', 'profileWord', 'actionsWord'],

    data: [

        {
            "id": 1,
            "userId": "12345678910",
            "name": "عمر خالد محمد",
            "email": "omar.2004@gmail.com",
            "type": "artistWord",
            "status": "activeWord",
            "joinDate": "2023-01-15"
        },

        {
            "id": 2,
            "userId": "22345678911",
            "name": "سارة احمد",
            "email": "sara.ahmed@example.com",
            "type": "clientWord",
            "status": "bannedWord",
            "joinDate": "2022-12-01"
        },

        {
            "id": 3,
            "userId": "32345678912",
            "name": "محمد ياسر",
            "email": "m.yasser@example.com",
            "type": "artistWord",
            "status": "activeWord",
            "joinDate": "2023-05-20"
        },

        {
            "id": 4,
            "userId": "42345678913",
            "name": "ليلى ناصر",
            "email": "laila.n@example.com",
            "type": "clientWord",
            "status": "bannedWord",
            "joinDate": "2021-11-03"
        },

        {
            "id": 5,
            "userId": "52345678914",
            "name": "طارق سمير",
            "email": "t.samir@example.com",
            "type": "artistWord",
            "status": "activeWord",
            "joinDate": "2023-07-10"
        },

        {
            "id": 6,
            "userId": "62345678915",
            "name": "هدى خليل",
            "email": "h.khalil@example.com",
            "type": "clientWord",
            "status": "activeWord",
            "joinDate": "2022-08-14"
        },

        {
            "id": 7,
            "userId": "72345678916",
            "name": "خالد مصطفى",
            "email": "k.mostafa@example.com",
            "type": "artistWord",
            "status": "bannedWord",
            "joinDate": "2021-09-09"
        },

        {
            "id": 8,
            "userId": "82345678917",
            "name": "منى عصام",
            "email": "mona.essam@example.com",
            "type": "clientWord",
            "status": "activeWord",
            "joinDate": "2023-03-18"
        },

        {
            "id": 9,
            "userId": "92345678918",
            "name": "يوسف عمرو",
            "email": "y.amr@example.com",
            "type": "artistWord",
            "status": "bannedWord",
            "joinDate": "2022-06-22"
        },

        {
            "id": 10,
            "userId": "10345678919",
            "name": "نور حسان",
            "email": "n.hassan@example.com",
            "type": "clientWord",
            "status": "activeWord",
            "joinDate": "2023-04-30"
        }

    ]

};

export default function UsersManagement() {

    const { t, i18n } = useTranslation();

    const usersButtons = [
        {id: 2, title: 'exportDataWord', icon: <PiExportBold/>, color: 'blue'},

    ];

    const listButtonsData = [

        {
            id: 1,
            data: ['allUsersWord', ...new Set(tableData.data.map(user => user.type))],
            key: 'type'
        },

        {
            id: 2,
            data: ['allStatusWord', ...new Set(tableData.data.map(user => user.status))],
            key: 'status'
        },

    ];

    // ====== handle-filter-data ====== //

    const [filters, setFilters] = useState({
        type: 'allUsersWord',
        status: 'allStatusWord'
    });

    const [filteredArray, setFilteredArray] = useState(tableData.data);

    useEffect(() => {

        if (tableData.data) {

            const filteredData = tableData.data.filter(officer => {
                const typeMatch = filters.type === 'allUsersWord' || officer.type === filters.type;
                const statusMatch = filters.status === 'allStatusWord' || officer.status === filters.status;
                return typeMatch && statusMatch;
            });

            setFilteredArray(filteredData);

        }

    }, [filters]);

    // ====== handle-search-process ====== //

    const onSearch = (value) => {
        setFilteredArray(tableData.data.filter(user => 
            user.name.toLowerCase().includes(value.toLowerCase()) || 
            user.email.toLowerCase().includes(value.toLowerCase())
        ));
    }

    return <React.Fragment>

        <section className='w-full flex flex-col gap-10'>

            <MainTitle title={'usersManageWord'} slogan={'userManagementPageSlogan'} buttons={usersButtons} />

            <div className='w-full flex flex-wrap gap-5 items-center justify-between'>

                <div className='w-sm'>
                    <SearchInput id={'userSearch'} placeholder={'usersSearchWord'} onSearch={(value) => onSearch(value)}/>
                </div>

                <div className='flex flex-wrap items-center gap-2.5'>
                    {listButtonsData.map((list, idx) => (
                        <ListBtn 
                            key={idx} listData={list.data} filterKey={list.key} color={'var(--white-color)'} 
                            onFilterChange={(key, value) => setFilters(prev => ({...prev, [key]: value}))}
                        />
                    ))}
                </div>

            </div>

            <div className='w-full rounded-2xl bg-[var(--white-color)] border border-[var(--mid-gray-color)] overflow-hidden'>

                <Table data={filteredArray} 
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
                                    <p>{user.name}</p>
                                </div>
                            </td>

                            <td 
                                className={`
                                    ${i18n.language === 'en' ? 'border-l' : 'border-r'} 
                                    border-solid border-[var(--mid-gray-color)] p-2.5 whitespace-nowrap
                                `}
                            >
                                <div className='w-full flex items-center justify-center'>

                                    <p 
                                        className='
                                            w-fit py-1 px-2.5 rounded-4xl 
                                            bg-[var(--sky-blue-color)] text-[var(--dark-blue-color)]
                                        '
                                    >
                                    {t(user.type)}
                                </p>

                                </div>
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

                                <div className='w-full flex items-center justify-center'>
                                    <p className={`
                                        w-fit py-1 px-2.5 rounded-4xl 
                                        ${user.status === 'bannedWord' 
                                            ? 'bg-[var(--light-red-color)] text-[var(--red-color)]' 
                                            : 'bg-[var(--light-green-color)] text-[var(--green-color)]'
                                        }
                                        font-medium 
                                    `}>{t(user.status)}</p>
                                </div>

                            </td>

                            <td 
                                className={`
                                    ${i18n.language === 'en' ? 'border-l' : 'border-r'} 
                                    border-solid border-[var(--mid-gray-color)] p-2.5 whitespace-nowrap
                                `}
                            >
                                {user.joinDate.split('-').map((item) => (
                                    Numbers(item, i18n.language, true)
                                )).reverse().join(' - ')}
                            </td>

                            <td className={`
                                ${i18n.language === 'en' ? 'border-l' : 'border-r'} 
                                border-solid border-[var(--mid-gray-color)] p-2.5 whitespace-nowrap
                            `}>
                                <div className='flex items-center justify-center'>
                                    <Link 
                                        to={`profile/${user.useId}`}
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
                        <button 
                            // onClick={() => handleBanClick(user)}
                            id={`banUser-${user.id}`}
                            className='
                                    p-2.5 rounded-md bg-[var(--light-red-color)]
                                    text-[var(--red-color)] cursor-pointer duration-300
                                    hover:bg-[var(--red-color)] hover:text-[var(--white-color)]
                            '
                        >
                            <IoBanSharp />
                        </button>
                    )}
                />

            </div>

        </section>

    </React.Fragment>

}

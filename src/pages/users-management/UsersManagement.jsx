import React, { useEffect, useMemo, useState } from 'react'
import MainTitle from '../../components/Titles/MainTitle'
import { PiExportBold, PiWarningOctagonBold } from 'react-icons/pi'
import SearchInput from '../../components/inputs/search-input/SearchInput'
import ListBtn from '../../components/buttons/ListBtn';
import Table from '../../components/table/Table';
import { useTranslation } from 'react-i18next';
import Numbers from '../../hooks/useConvertNumber';
import { Link } from 'react-router-dom';
import { IoIosArrowForward } from 'react-icons/io';
import { IoBanSharp } from 'react-icons/io5';
import { FaArrowsRotate } from "react-icons/fa6";
import { LuMessageSquareText } from 'react-icons/lu';
import { ROUTES } from '../../constants/routes';
import ElementBox from '../../components/elements-box/ElementBox';
import { useFilterAndSearch } from '../../hooks/useFilterAndSearch';

// ====== import-images ====== //

import noImg from '../../assets/images/not-found-img.jpeg';
import { useFetchQuery } from '../../hooks/useFetchQuery';
import { endpoints } from '../../constants/endPoints';
import PaginationList from '../../components/pagination-list/PaginationList';
import DeleteOperation from '../../components/delete-operation/DeleteOperation';
import ExploreDataBtn from '../../components/explore-data/ExploreDataBtn';

const tableData = {
    columns: ['nameWord', 'typeWord', 'emailWord', 'statusWord', 'joinDateWord', 'profileWord', 'actionsWord'],
};

export default function UsersManagement() {

    const { t, i18n } = useTranslation();

    // ====== get-table-data ====== //

    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const main = document.querySelector('main.content-width');
        if (main) {
            main.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, [currentPage]);

    const {data, isLoading, isError} = useFetchQuery(['users', currentPage], `${endpoints.users.getUsers}?page=${currentPage}`);

    // ====== handle-filter-&-search-data ====== //

    const uniqueRoles = [...new Set(data?.data?.users?.map(user => user.role))];
    const uniqueStatuses = [...new Set(data?.data?.users?.map(user => user.isActive))];
    const listButtonsData = [

        {
            id: 1,
            data: [
                { value: 'allUsersWord', label: 'allUsersWord' },
                ...uniqueRoles.map(type => ({
                    value: type,
                    label: type === 'user' ? 'clientWord' : 'artistWord'
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
                    label: status ? 'activeWord' : 'inactiveWord'
                }))
            ],
            key: 'isActive'
        }

    ];

    const initialFilters = {
        type: 'allUsersWord',
        status: 'allStatusWord'
    };

    const excludeValues = useMemo(() => ['allUsersWord', 'allStatusWord'], []);
    const searchKeys  = useMemo(() => ['displayName', 'email'], []);
    const {filteredData, setFilters, setSearchText} = useFilterAndSearch(
        data?.data?.users, initialFilters, excludeValues, searchKeys 
    );

    // ====== profile-url ====== //

    const profileId = (user) => {
        return `${user.role === 'user' ? ROUTES.CLIENT_PROFILE_ROUTE : ROUTES.ARTIST_PROFILE_ROUTE}/${user._id}`
    };

    // ====== handle-delete-row ====== //

    const [isOpen, setIsOpen] = useState(false);
    const [openCount, setOpenCount] = useState(0);
    const [itemId, setItemId] = useState(null);
    const [itemStatus, setItemStatus] = useState(null);
    const handleDeleteRow = (item) => {
        setIsOpen(true);
        setItemId(item._id);
        setItemStatus(item.isActive);
        setOpenCount(prev => prev + 1);
    }

    return <React.Fragment>

        {isOpen && <DeleteOperation key={openCount} method={'delete'}
            icon={itemStatus ? <PiWarningOctagonBold /> : <FaArrowsRotate />} 
            iconColor={itemStatus ? 'var(--red-color)' : 'var(--green-color)'}
            title={itemStatus ? 'deleteUserTitle' : 'reactiveUserTitle'} msg={itemStatus ? 'deleteUserMsg' : 'reactiveUserMsg'} 
            successMsg={itemStatus ? 'banUserSuccessMsg' : 'activeUserSuccess'} 
            errorMsg={itemStatus ? 'banUserErrorMsg' : 'activeUserErrorMsg'}
            setIsOpen={setIsOpen} endPoint={`${endpoints.users.getUsers}/${itemId}/block`} tableName={'users'}
        />}

        <section className='w-full flex flex-col gap-10'>

            <MainTitle title={'usersManageWord'} slogan={'userManagementPageSlogan'}>
                <ExploreDataBtn 
                    dataFormat={`data.users`} fileName={'users-management-data'}
                    endpoint={ endpoints.users.getUsers} queryName={'exportUsers'}
                />
            </MainTitle>

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
                    isLoading={isLoading} isError={isError}
                    emptyMsg={'notFoundMatchedUsersMsg'}
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
                                        src={user.profileImage.url} onError={(e) =>e.target.src = noImg}
                                        alt={`${user.displayName} image`} loading='lazy' 
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
                                    title={user.role === 'user' ? 'clientWord' : 'artistWord'} 
                                    bgColor={'var(--sky-blue-color)'} color={'var(--dark-blue-color)'} 
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
                                    title={user.isActive ? 'activeWord' : 'inactiveWord'} 
                                    color={user.isActive === false ? 'var(--red-color)' : 'var(--green-color)'} 
                                    bgColor={user.isActive === false ? 'var(--light-red-color)' : 'var(--light-green-color)'} 
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
                                )).reverse().join(' - ')}
                            </td>

                            <td 
                                className={`
                                    ${i18n.language === 'en' ? 'border-l' : 'border-r'} 
                                    border-solid border-[var(--mid-gray-color)] p-2.5 whitespace-nowrap
                                `}
                            >
                                <div className='flex items-center justify-center'>
                                    <Link 
                                        to={profileId(user)}
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
                                to={`${ROUTES.SEND_MESSAGE_ROUTE}/${user._id}/${user.role}`}
                                onClick={(e) => user.isActive === false && e.preventDefault()}
                                className={`
                                    p-2.5 rounded-md bg-[var(--sky-blue-color)]
                                    text-[var(--dark-blue-color)] duration-300
                                    ${user.isActive === false ? 'cursor-not-allowed opacity-50' : 'opacity-100'}
                                `}
                            >
                                <LuMessageSquareText />
                            </Link>

                            <button 
                                onClick={() => handleDeleteRow(user)}
                                id={`banUser-${user.id}`}
                                className={`
                                    p-2.5 rounded-md cursor-pointer duration-300
                                    ${user.isActive 
                                        ? `*
                                            bg-[var(--light-red-color)] text-[var(--red-color)] 
                                            hover:bg-[var(--red-color)] hover:text-[var(--white-color)]
                                        `
                                        : `
                                            bg-[var(--light-green-color)] text-[var(--green-color)] 
                                            hover:bg-[var(--green-color)] hover:text-[var(--white-color)]
                                        `
                                    }
                                `}
                            >
                                {user.isActive ? <IoBanSharp /> : <FaArrowsRotate />}
                            </button>

                        </div>
                    )}
                />

            </div>

            {data?.data?.pagination.pages > 1 && 
                <PaginationList data={data?.data?.pagination} currentPage={currentPage} setCurrentPage={setCurrentPage} />
            }

        </section>

    </React.Fragment>

}

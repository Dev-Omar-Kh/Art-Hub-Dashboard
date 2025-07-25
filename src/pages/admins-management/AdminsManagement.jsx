import React, { useEffect, useMemo, useState } from 'react'
import MainTitle from '../../components/Titles/MainTitle'
import { PiWarningOctagonBold } from 'react-icons/pi'
import SearchInput from '../../components/inputs/search-input/SearchInput'
import ListBtn from '../../components/buttons/ListBtn';
import Table from '../../components/table/Table';
import { useTranslation } from 'react-i18next';
import Numbers from '../../hooks/useConvertNumber';
import { Link } from 'react-router-dom';
import { IoIosAddCircleOutline, IoIosArrowForward } from 'react-icons/io';
import { IoBanSharp } from 'react-icons/io5';
import { ROUTES } from '../../constants/routes';
import ElementBox from '../../components/elements-box/ElementBox';
import { useFilterAndSearch } from '../../hooks/useFilterAndSearch';
import { FiEdit } from 'react-icons/fi';
import { useFetchQuery } from '../../hooks/useFetchQuery';
import { endpoints } from '../../constants/endPoints';
import PaginationList from '../../components/pagination-list/PaginationList';
import DeleteOperation from '../../components/delete-operation/DeleteOperation';

import errorImg from '../../assets/images/not-found-img.jpeg';

const tableData = {
    columns: ['nameWord', 'typeWord', 'emailWord', 'statusWord', 'joinDateWord', 'profileWord', 'actionsWord'],
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

    // ====== get-table-data ====== //

    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const main = document.querySelector('main.content-width');
        if (main) {
            main.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, [currentPage]);

    const {data, isLoading, isError} = useFetchQuery(
        ['admins', currentPage], 
        `${endpoints.admins.getAdmins}?page=${currentPage}`
    );

    // ====== handle-filter-&-search-data ====== //

    const uniqueRoles = [...new Set(data?.data?.admins.map(admin => admin.role))];
    const uniqueStatuses = [...new Set(data?.data?.admins.map(admin => admin.isActive))];
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
        data?.data?.admins, initialFilters, excludeValues, searchKeys 
    );

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

        {isOpen && <DeleteOperation key={openCount} method={'delete'}
            icon={<PiWarningOctagonBold />} iconColor={'var(--red-color)'}
            title={'deleteAdminTitle'} msg={'deleteAdminMsg'} 
            successMsg={'banAdminSuccessMsg'} errorMsg={'banAdminErrorMsg'}
            setIsOpen={setIsOpen} tableName={'admins'}
            endPoint={`${endpoints.admins.getAdmins}/${itemId}`} 
        />}

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
                    isLoading={isLoading} isError={isError}
                    emptyMsg={'notFoundMatchedAdminsMsg'}
                    columns={tableData.columns} 
                    actions={true}
                    renderRow={(admin) => (
                        <React.Fragment>

                            <td className='p-2.5 whitespace-nowrap'>
                                <div className='w-fit flex items-center gap-2.5'>
                                    <img
                                        className='
                                            w-10 h-10 min-w-10 min-h-10 rounded-full object-cover 
                                            border border-[var(--dark-blue-color)]
                                        '
                                        src={admin.profileImage.url} onError={(e) => e.target.src = errorImg}
                                        alt={`${admin.name} image`} loading='lazy' 
                                    />
                                    <p>{admin.displayName}</p>
                                </div>
                            </td>

                            <td 
                                className={`
                                    ${i18n.language === 'en' ? 'border-l' : 'border-r'} 
                                    border-solid border-[var(--mid-gray-color)] p-2.5 whitespace-nowrap
                                `}
                            >
                                <ElementBox 
                                    title={admin.role.toLowerCase() === 'admin' ? 'adminWord' : 'superadminWord'} 
                                    bgColor={admin.role.toLowerCase() === 'admin' ? 'var(--sky-blue-color)' : 'var(--mid-blue-color)'} 
                                    color={'var(--dark-blue-color)'} 
                                />
                            </td>

                            <td 
                                className={`
                                    ${i18n.language === 'en' ? 'border-l' : 'border-r'} 
                                    border-solid border-[var(--mid-gray-color)] p-2.5 whitespace-nowrap
                                `}
                            >
                                {admin.email}
                            </td>

                            <td 
                                className={`
                                    ${i18n.language === 'en' ? 'border-l' : 'border-r'} 
                                    border-solid border-[var(--mid-gray-color)] p-2.5 whitespace-nowrap
                                `}
                            >
                                <ElementBox 
                                    title={admin.isActive ? 'activeWord' : 'bannedWord'} 
                                    color={admin.isActive === 'bannedWord' ? 'var(--red-color)' : 'var(--green-color)'} 
                                    bgColor={admin.isActive === 'bannedWord' ? 'var(--light-red-color)' : 'var(--light-green-color)'} 
                                />
                            </td>

                            <td 
                                className={`
                                    ${i18n.language === 'en' ? 'border-l' : 'border-r'} 
                                    border-solid border-[var(--mid-gray-color)] p-2.5 whitespace-nowrap
                                `}
                            >
                                {admin.createdAt.split('T')[0].split('-').map((item) => (
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
                                        to={`${ROUTES.ADMIN_ROUTE}/${admin._id}`}
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
                    onActionClick={(admin) => (
                        <div className='w-full flex items-center justify-center gap-2.5'>

                            <Link 
                                to={`${ROUTES.EDIT_ADMIN_ROUTE}/${admin._id}`} 
                                className='
                                    p-2.5 rounded-md bg-[var(--sky-blue-color)]
                                    text-[var(--dark-blue-color)] cursor-pointer duration-300
                                '
                            >
                                <FiEdit />
                            </Link>

                            <button 
                                onClick={() => handleDeleteRow(admin)}
                                id={`banUser-${admin.id}`}
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
                <PaginationList data={data?.data?.pagination} currentPage={currentPage} setCurrentPage={setCurrentPage} />
            }

        </section>

    </React.Fragment>

}
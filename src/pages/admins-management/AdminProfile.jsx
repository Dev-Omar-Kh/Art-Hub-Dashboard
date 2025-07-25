import React from 'react';
import { FiEdit } from 'react-icons/fi';
import { IoBanSharp, IoCalendarOutline, IoInformationCircleOutline } from 'react-icons/io5';
import MainTitle from '../../components/Titles/MainTitle';
import { ROUTES } from '../../constants/routes';
import PathSteps from '../../components/path-steps/PathSteps';
import { useTranslation } from 'react-i18next';
import Numbers from '../../hooks/useConvertNumber';
import { MdOutlineMail } from 'react-icons/md';
import ElementBox from '../../components/elements-box/ElementBox';
import { GiRank3 } from 'react-icons/gi';
import { useFetchQuery } from '../../hooks/useFetchQuery';
import { useParams } from 'react-router-dom';
import { endpoints } from '../../constants/endPoints';
import AdminProfileLoading from './AdminProfileLoading';
import FetchError from '../../components/error/FetchError';

import errorImg from '../../assets/images/not-found-img.jpeg';

const profileButtons = [
    {id: 1, title: 'editDataWord', icon: <FiEdit />, color: 'var(--white-color)', bgColor: 'var(--dark-blue-color)'},
    {id: 2, title: 'banWord', icon: <IoBanSharp />, color: 'var(--red-color)', bgColor: 'var(--light-red-color)'},
];

const paths = [
    {id: 1, title: 'adminsManageWord', url: ROUTES.ADMINS_ROUTE},
    {id: 2, title: 'adminProfileWord'},
];

export default function AdminProfile() {

    const {i18n} = useTranslation();
    const {id} = useParams();

    // ====== get-admin-data ====== //

    const {data, isLoading, isError} = useFetchQuery(
        ['oneAdmin', id], 
        `${endpoints.admins.getAdmins}/${id}`
    );

    console.log(data?.data);

    return <React.Fragment>

        <section className='w-full flex flex-col gap-10'>
        
            <MainTitle title={'adminProfileWord'} slogan={'adminProfileSlogan'} buttons={profileButtons} />

            <PathSteps paths={paths} />

            {isLoading && <AdminProfileLoading />}

            {isError && <FetchError className='w-full h-full' />}

            {data && <div 
                className='
                    w-full p-5 flex items-center gap-5 rounded-2xl bg-[var(--white-color)] 
                    shadow-[0_0px_10px_var(--shadow-black-color)] max-[695px]:flex-col max-[770px]:items-start
                '
            >

                <div className='w-52 h-52 overflow-hidden max-[430px]:w-36 max-[430px]:h-36 max-[430px]:m-auto'>
                    <img 
                        className='w-full h-full rounded-full object-cover' onError={(e) => e.target.src = errorImg}
                        src={data?.data?.profileImage.url} alt={`admin ${data?.data?.displayName} profile image`} 
                    />
                </div>

                <div className='flex flex-col gap-5'>

                    <h3 
                        className='
                            flex flex-wrap items-center gap-1 
                            text-2xl font-semibold text-[var(--dark-blue-color)]
                        '
                    >
                        {data?.data?.displayName}
                        <span className='text-base text-[var(--gray-color)]'> 
                            {` (${data?.data?._id})`}
                        </span>
                    </h3>

                    <div className='w-full flex flex-col gap-2.5'>

                        <div className='flex items-center gap-2.5 font-medium text-[var(--gray-color)]'>
                            <MdOutlineMail className='text-xl text-[var(--dark-blue-color)]' />
                            <p>{data?.data?.email}</p>
                        </div>

                        <div className='flex items-center gap-2.5 font-medium text-[var(--gray-color)]'>
                            <IoCalendarOutline className='text-xl text-[var(--dark-blue-color)]' />
                            <p className='text-lg'>
                                {data?.data?.createdAt.split('T')[0].split('-').map((item) => (
                                    Numbers(item, i18n.language, true)
                                )).join(' - ')}
                            </p>
                        </div>

                        <div className='w-full flex flex-wrap items-center gap-2.5'>

                            <div className='flex items-center gap-2.5 font-medium text-[var(--gray-color)]'>
                                <GiRank3 className='text-xl text-[var(--dark-blue-color)]' />
                                <div>
                                    <ElementBox 
                                        title={data?.data?.role === "admin" ? 'adminWord' : 'superadminWord'}
                                        bgColor={data?.data?.role === "admin" ? 'var(--sky-blue-color)' : 'var(--mid-blue-color)'} 
                                        color={'var(--dark-blue-color)'}
                                    />
                                </div>
                            </div>

                            <div className='flex items-center gap-2.5 font-medium text-[var(--gray-color)]'>
                                <IoInformationCircleOutline className='text-xl text-[var(--dark-blue-color)]' />
                                <div>
                                    <ElementBox 
                                        title={data?.data?.isActive ? 'activeWord' : 'inactiveWord'}
                                        bgColor={data?.data?.isActive ? 'var(--light-green-color)' : 'var(--light-red-color)'} 
                                        color={data?.data?.isActive ? 'var(--green-color)' : 'var(--red-color)'}
                                    />
                                </div>
                            </div>

                        </div>

                    </div>

                </div>

            </div>}

        </section>

    </React.Fragment>

}

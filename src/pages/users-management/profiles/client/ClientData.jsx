import React from 'react';
import { MdOutlineMail, MdOutlinePhoneEnabled } from 'react-icons/md';
import Numbers from '../../../../hooks/useConvertNumber';
import { useTranslation } from 'react-i18next';
import { IoCalendarOutline, IoLocationOutline } from 'react-icons/io5';
import ElementBox from '../../../../components/elements-box/ElementBox';
import ProfileAchieve from '../../../../components/profile-achievement/ProfileAchieve';
import LoadingRow from '../../../../components/loading-row/LoadingRow';
import { GoStarFill } from 'react-icons/go';
import FetchError from '../../../../components/error/FetchError';

export default function ClientData({userData, isLoading, isError}) {

    const { i18n } = useTranslation();

    // ====== handle-statistics-data ====== //

    const clientAchievements = [
        {id: 1, title: 'totalOrdersWord', value: userData?.statistics.totalOrders, isMoney: false},
        {id: 2, title: 'totalPaymentWord', value: userData?.statistics.totalSpent, isMoney: true},
        {id: 3, title: 'rateCountWord', value: userData?.statistics.totalReviews, isMoney: false},
        {
            id: 4, 
            title: 'rateAverageWord', 
            value: userData?.statistics.averageRating, 
            icon: <GoStarFill />, 
            iconColor: 'var(--yellow-color)', 
            isMoney: false
        },
    ];

    if(isError) return <FetchError className='w-full h-fit' />

    return <React.Fragment>

        <div className='w-full grid grid-cols-5 gap-5 max-[735px]:grid-cols-1'>

            {userData && <div className='relative flex flex-col gap-2.5 rounded-2xl bg-[var(--white-color)] p-5 col-span-2 max-[735px]:col-span-1'>

                <div className='absolute top-5 end-5'>
                    <ElementBox 
                        shadow={true} title={userData?.isActive ? 'activeWord' : 'inactiveWord'} 
                        bgColor={userData?.isActive ? 'var(--light-green-color)' : 'var(--light-red-color)'} 
                        color={userData?.isActive ? 'var(--green-color)' : 'var(--red-color)'} 
                    />
                </div>

                <img src={userData?.profileImage.url} 
                    alt={`client image`} 
                    className='w-20 h-20 rounded-full object-cover border-3 border-[var(--dark-blue-color)]' 
                />

                <div className='flex flex-col gap-2.5'>

                    <h3 className='text-2xl font-semibold text-[var(--dark-blue-color)]'>{userData?.displayName}</h3>

                    <div className='flex items-center gap-2.5 font-medium text-[var(--gray-color)]'>
                        <MdOutlineMail className='text-xl text-[var(--dark-blue-color)]' />
                        <p>{userData?.email}</p>
                    </div> 

                    <div className='flex flex-wrap gap-2.5'>

                        <div className='flex items-center gap-2.5 font-medium text-[var(--gray-color)]'>
                            <IoCalendarOutline className='text-xl text-[var(--dark-blue-color)]' />
                            <p className='text-lg'>
                                {userData?.createdAt.split('T')[0].split('-').map((item) => (
                                    Numbers(item, i18n.language, true)
                                )).join(' - ')}
                            </p>
                        </div>

                        <div className='flex items-center gap-2.5 font-medium text-[var(--gray-color)]'>
                            <IoLocationOutline className='text-xl text-[var(--dark-blue-color)]' />
                            <p>الرياض, السعودية</p>
                        </div>

                    </div>

                </div>

            </div>}

            {isLoading && <div className='relative flex flex-col gap-5 rounded-2xl bg-[var(--white-color)] p-5 col-span-2 max-[735px]:col-span-1'>

                <div className='absolute top-5 end-5'>
                    <LoadingRow className='w-24 h-10 rounded-4xl' />
                </div>

                <LoadingRow className={`w-20 h-20 rounded-full object-cover border-3 border-[var(--dark-blue-color)]`} />

                <div className='w-full flex flex-col gap-5'>

                    <LoadingRow className='w-3/4 h-6 rounded-4xl' />

                    <LoadingRow className='w-2/3 h-4 rounded-4xl' />

                    <LoadingRow className='w-3/4 h-4 rounded-4xl' />

                </div>

            </div>}

            <ProfileAchieve achieveData={clientAchievements} isLoading={isLoading} isError={isError} />

        </div>

    </React.Fragment>

}

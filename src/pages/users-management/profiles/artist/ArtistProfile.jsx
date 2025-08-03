import React, { useState } from 'react'
import { ROUTES } from '../../../../constants/routes';
import MainTitle from '../../../../components/Titles/MainTitle';
import PathSteps from '../../../../components/path-steps/PathSteps';
import { IoBanSharp } from 'react-icons/io5';
import ArtistData from './ArtistData';
import { LuMessageSquareText } from 'react-icons/lu';
import { useParams } from 'react-router-dom';
import ProfileLayout from '../../../../layouts/ProfileLayout';
import ProfileAchieve from '../../../../components/profile-achievement/ProfileAchieve';
import { GoStarFill } from 'react-icons/go';
import { useTranslation } from 'react-i18next';
import { useFetchQuery } from '../../../../hooks/useFetchQuery';
import { endpoints } from '../../../../constants/endPoints';
import FetchError from '../../../../components/error/FetchError';
import DeleteOperation from '../../../../components/delete-operation/DeleteOperation';
import { PiWarningOctagonBold } from 'react-icons/pi';
import { FaArrowsRotate } from 'react-icons/fa6';

export default function ArtistProfile() {

    const {id} = useParams();
    const {t} = useTranslation();

    // ====== get-artist-data ====== //

    const {data, isLoading, isError} = useFetchQuery(
        ['artistData', id], 
        `${endpoints.artist.baseLink}/${id}/${endpoints.artist.info}`
    );

    const checkActivate = data?.data?.artist.isActive
    const profileButtons = [
        {
            id: 1, 
            disabled: checkActivate,
            url: `${ROUTES.USERS_ROUTE}/${ROUTES.SEND_MESSAGE_ROUTE}/${id}/artist`,
            title: 'sendMessageWord',
            icon: <LuMessageSquareText />, 
            color: 'var(--white-color)', 
            bgColor: 'var(--dark-blue-color)'
        },
        {
            id: 2, 
            title: checkActivate ? 'banWord' : 'reactiveWord', 
            icon: checkActivate ? <PiWarningOctagonBold /> : <FaArrowsRotate />, 
            color: checkActivate ? 'var(--red-color)' : 'var(--green-color)', 
            bgColor: checkActivate ? 'var(--light-red-color)' : 'var(--light-green-color)',
            disabled: isLoading || isError,
            onClick: () => handleDeleteRow(data?.data?.artist)
        },
    ];

    const paths = [
        {id: 1, title: 'usersManageWord', url: ROUTES.USERS_ROUTE},
        {id: 2, title: 'artistProfileWord'},
    ];

    const statisticsData = data?.data?.stats;
    const achData = [
        {id: 1, title: 'totalCompletedOrdersWord', value: statisticsData?.completedOrders, isMoney: false},
        {id: 2, title: 'totalSalesWord', value: statisticsData?.totalSales, isMoney: true},
        {id: 3, title: 'totalWorksWord', value: statisticsData?.artworksCount, isMoney: false},
        {
            id: 4, 
            title: 'rateAverageWord', 
            value: statisticsData?.avgRating, 
            icon: <GoStarFill />, 
            iconColor: 'var(--yellow-color)', 
            isMoney: false
        },
    ]

    const linksData = [
        {id: 1, title: 'artistWorksWord', to: ''},
        {id: 2, title: 'submittedReportsWord', to: ROUTES.ARTIST_REPORTS_ROUTE},
        {id: 3, title: 'ratesWord', to: ROUTES.ARTIST_RATES_ROUTE},
        {id: 4, title: 'activityLogWord', to: ROUTES.ARTIST_ACTIVITY_LOG_ROUTE},
    ];

    // ====== delete-row ====== //

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
            errorMsg={itemStatus ? 'banUserErrorMsg' : 'activeUserErrorMsg'} goTo={ROUTES.USERS_ROUTE}
            setIsOpen={setIsOpen} endPoint={`${endpoints.users.getUsers}/${itemId}/block`} tableName={'users'}
        />}

        <section className='w-full flex flex-col gap-10'>

            <MainTitle title={'artistProfileWord'} slogan={'artistProfileSlogan'} buttons={profileButtons} />

            <PathSteps paths={paths} />

            {/* {isError && <FetchError className='w-full h-fit' />} */}

            {isError && <FetchError className='w-full h-fit' />}
            {!isError && <React.Fragment>

                <ArtistData data={data} isLoading={isLoading} isError={isError} />

                <div className='w-full flex flex-col rounded-2xl bg-[var(--white-color)] shadow-[0_0px_10px_var(--shadow-black-color)]'>

                    <h3 className='px-5 pt-5 text-2xl font-semibold text-[var(--dark-blue-color)]'>{t('artistStatsWord')}</h3>

                    <ProfileAchieve gridCols={4} achieveData={achData} isLoading={isLoading} isError={isError} />

                </div>

            </React.Fragment>}

            <ProfileLayout linksData={linksData} />

        </section>

    </React.Fragment>

}
import React from 'react'
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

export default function ArtistProfile() {

    const {id} = useParams();
    const {t} = useTranslation();

    const profileButtons = [
        {
            id: 1, 
            url: `${ROUTES.USERS_ROUTE}/${ROUTES.SEND_MESSAGE_ROUTE}/${id}`,
            title: 'sendMessageWord',
            icon: <LuMessageSquareText />, 
            color: 'var(--white-color)', 
            bgColor: 'var(--dark-blue-color)'
        },
        {id: 2, title: 'banWord', icon: <IoBanSharp />, color: 'var(--red-color)', bgColor: 'var(--light-red-color)'},
    ];

    const paths = [
        {id: 1, title: 'usersManageWord', url: ROUTES.USERS_ROUTE},
        {id: 2, title: 'artistProfileWord'},
    ];

    const achData = [
        {id: 1, title: 'totalCompletedOrdersWord', value: '12', isMoney: false},
        {id: 2, title: 'totalSalesWord', value: '2450', isMoney: true},
        {id: 3, title: 'totalWorksWord', value: '25', isMoney: false},
        {id: 4, title: 'rateAverageWord', value: '4.8', icon: <GoStarFill />, iconColor: 'var(--yellow-color)', isMoney: false},
    ]

    const linksData = [
        {id: 1, title: 'artistWorksWord', to: ''},
        {id: 2, title: 'submittedReportsWord', to: ROUTES.ARTIST_REPORTS_ROUTE},
        {id: 3, title: 'ratesWord', to: ROUTES.ARTIST_RATES_ROUTE},
        {id: 4, title: 'activityLogWord', to: ROUTES.ARTIST_ACTIVITY_LOG_ROUTE},
    ];

    return <React.Fragment>

        <section className='w-full flex flex-col gap-10'>

            <MainTitle title={'artistProfileWord'} slogan={'artistProfileSlogan'} buttons={profileButtons} />

            <PathSteps paths={paths} />

            <ArtistData />

            <div className='w-full flex flex-col rounded-2xl bg-[var(--white-color)] shadow-[0_0px_10px_var(--shadow-black-color)]'>

                <h3 className='px-5 pt-5 text-2xl font-semibold text-[var(--dark-blue-color)]'>{t('artistStatsWord')}</h3>

                <ProfileAchieve gridCols={4} achieveData={achData} />

            </div>

            <ProfileLayout linksData={linksData} />

        </section>

    </React.Fragment>

}
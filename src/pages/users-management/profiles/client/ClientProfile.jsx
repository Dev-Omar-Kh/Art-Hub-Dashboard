import React from 'react'
import MainTitle from '../../../../components/Titles/MainTitle'
import { LuMessageSquareText } from 'react-icons/lu'
import { IoBanSharp } from 'react-icons/io5'
import { ROUTES } from '../../../../constants/routes'
import ClientData from './ClientData'
import PathSteps from '../../../../components/path-steps/PathSteps'
import { GoStarFill } from 'react-icons/go'
import { useParams } from 'react-router-dom'
import ProfileLayout from '../../../../layouts/ProfileLayout'

export default function ClientProfile() {

    const {id} = useParams();

    const profileButtons =[

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
        {id: 2, title: 'clientProfileWord'},
    ];

    const clientAchievements = [
        {id: 1, title: 'totalOrdersWord', value: '12', isMoney: false},
        {id: 2, title: 'totalPaymentWord', value: '2450', isMoney: true},
        {id: 3, title: 'rateCountWord', value: '8', isMoney: false},
        {id: 4, title: 'rateAverageWord', value: '4.8', icon: <GoStarFill />, iconColor: 'var(--yellow-color)', isMoney: false},
    ]

    const linksData = [
        {id: 1, title: 'overViewWord', to: ''},
        {id: 2, title: 'ordersWord', to: ROUTES.CLIENT_ORDERS_ROUTE},
        {id: 3, title: 'ratesWord', to: ROUTES.CLIENT_RATES_ROUTE},
        {id: 4, title: 'activityLogWord', to: ROUTES.CLIENT_ACTIVITY_LOG_ROUTE},
    ];

    return <React.Fragment>

        <section className='w-full flex flex-col gap-10'>

            <MainTitle title={'clientProfileWord'} slogan={'clientProfileSlogan'} buttons={profileButtons} />

            <PathSteps paths={paths} />

            <ClientData achData={clientAchievements} />

            <ProfileLayout linksData={linksData} />

        </section>

    </React.Fragment>

}

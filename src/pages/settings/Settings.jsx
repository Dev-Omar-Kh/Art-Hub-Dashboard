import React from 'react'
import MainTitle from '../../components/Titles/MainTitle'
import { ROUTES } from '../../constants/routes';
import TabNavigation from '../../components/tab-navigation/TabNavigation';
import { Outlet } from 'react-router-dom';

export default function Settings() {

    const linksData = [
        {id: 1, title: 'accountSettingWord', to: ''},
        {id: 2, title: 'usersSettingWordWord', to: ROUTES.USERS_SETTING_ROUTE},
        {id: 3, title: 'orderSettingWord', to: ROUTES.ORDERS_SETTING_ROUTE},
        {id: 4, title: 'paymentSettingWord', to: ROUTES.PAYMENT_SETTING_ROUTE},
        {id: 5, title: 'policySettingWord', to: ROUTES.POLICY_SETTING_ROUTE},
    ];

    return <React.Fragment>

        <section className='w-full flex flex-col gap-10'>

            <MainTitle title={'systemSettingsWord'} slogan={'systemSettingsPageSlogan'} />

            <div className='w-full flex flex-col gap-5 bg-[var(--white-color)] rounded-2xl p-5'>

                <TabNavigation linksData={linksData} />

                <Outlet />

            </div>

        </section>

    </React.Fragment>

}

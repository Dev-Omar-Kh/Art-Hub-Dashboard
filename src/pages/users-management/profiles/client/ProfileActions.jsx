import React from 'react';
import TabNavigation from '../../../../components/tab-navigation/TabNavigation';
import { ROUTES } from '../../../../constants/routes';
import { Outlet } from 'react-router-dom';

export default function ProfileActions() {

    const linksData = [
        {id: 1, title: 'overViewWord', to: ''},
        {id: 2, title: 'ordersWord', to: ROUTES.CLIENT_ORDERS_ROUTE},
        {id: 3, title: 'ratesWord', to: ROUTES.CLIENT_RATES_ROUTE},
        {id: 4, title: 'activityLogWord', to: ROUTES.CLIENT_ACTIVITY_LOG_ROUTE},
    ];

    return <React.Fragment>

        <div className='w-full flex flex-col gap-5 bg-[var(--white-color)] rounded-2xl p-5'>

            <TabNavigation linksData={linksData} />

            <Outlet />

        </div>

    </React.Fragment>

}

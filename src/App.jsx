import React, { Suspense, useEffect } from 'react';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useLocalStorage from './hooks/useLocalStorage';
import { ROUTES } from './constants/routes';
import SubLayout from './layouts/SubLayout';

const Home = React.lazy(() => import('./pages/home/Home'));
const MainLayout = React.lazy(() => import('./layouts/MainLayout'));
const Reports = React.lazy(() => import('./pages/reports/Reports'));
const Login = React.lazy(() => import('./pages/authentication/Login'));
const Settings = React.lazy(() => import('./pages/settings/Settings'));
const Loading = React.lazy(() => import('./pages/status-pages/Loading'));
const SalesAnalysis = React.lazy(() => import('./pages/sales-analysis/SalesAnalysis'));
const RatesManagement = React.lazy(() => import('./pages/rates-management/RatesManagement'));
const UsersManagement = React.lazy(() => import('./pages/users-management/UsersManagement'));
const OrdersManagement = React.lazy(() => import('./pages/orders-management/OrdersManagement'));
const MessageForm = React.lazy(() => import('./pages/users-management/message-form/MessageForm'));
const AccountSetting = React.lazy(() => import('./pages/settings/setting-actions/AccountSetting'));
const ArtistProfile = React.lazy(() => import('./pages/users-management/profiles/artist/ArtistProfile'));
const ClientProfile = React.lazy(() => import('./pages/users-management/profiles/client/ClientProfile'));
const OverView = React.lazy(() => import('./pages/users-management/profiles/client/profile-actions/OverView'));
const ClientLog = React.lazy(() => import('./pages/users-management/profiles/client/profile-actions/ClientLog'));
const ClientRates = React.lazy(() => import('./pages/users-management/profiles/client/profile-actions/ClientRates'));
const ClientOrders = React.lazy(() => import('./pages/users-management/profiles/client/profile-actions/ClientOrders'));

const routes = createHashRouter([

    {path: ROUTES.HOME_ROUTE, element: <MainLayout />, children: [

        {path: ROUTES.HOME_ROUTE, element: <Home />},
        {path: ROUTES.USERS_ROUTE, element: <SubLayout />, children: [
            {path: ROUTES.USERS_ROUTE, element: <UsersManagement />},
            {path: `${ROUTES.ARTIST_PROFILE_ROUTE}/:id`, element: <ArtistProfile />},
            {path: `${ROUTES.CLIENT_PROFILE_ROUTE}/:id`, element: <ClientProfile />, children: [

                {index: true, element: <OverView />},
                {path: ROUTES.CLIENT_ORDERS_ROUTE, element: <ClientOrders />},
                {path: ROUTES.CLIENT_RATES_ROUTE, element: <ClientRates />},
                {path: ROUTES.CLIENT_ACTIVITY_LOG_ROUTE, element: <ClientLog />},

            ]},
            {path: `${ROUTES.SEND_MESSAGE_ROUTE}/:id`, element: <MessageForm />},
        ]},
        {path: ROUTES.ORDERS_ROUTE, element: <OrdersManagement />},
        {path: ROUTES.SALES_ANALYSIS_ROUTE, element: <SalesAnalysis />},
        {path: ROUTES.RATES_ROUTE, element: <RatesManagement />},
        {path: ROUTES.REPORTS_ROUTE, element: <Reports />},
        {path: ROUTES.SETTINGS_ROUTE, element: <Settings />, children: [
            {index: true, element: <AccountSetting />},
            {path: ROUTES.USERS_SETTING_ROUTE, element: <h1>Users Setting</h1>},
            {path: ROUTES.ORDERS_SETTING_ROUTE, element: <h1>Orders Setting</h1>},
            {path: ROUTES.PAYMENT_SETTING_ROUTE, element: <h1>Payment Setting</h1>},
            {path: ROUTES.POLICY_SETTING_ROUTE, element: <h1>Policy Setting</h1>},
        ]},

    ], errorElement: <div>404</div>},

    {path: ROUTES.LOGIN_ROUTE, element: <Login />, errorElement: <div>404</div>},

]);

export default function App() {

    const { i18n } = useTranslation();
    const [savedLang] = useLocalStorage('language', 'ar');

    useEffect(() => {

        if (savedLang && i18n.language !== savedLang) {
            i18n.changeLanguage(savedLang);
        }
    
        document.documentElement.lang = i18n.language;
        document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';

    }, [i18n, i18n.language, savedLang]);

    return <React.Fragment>

        <Suspense fallback={<Loading />}>
            <RouterProvider router={routes} />
        </Suspense>

    </React.Fragment>

}
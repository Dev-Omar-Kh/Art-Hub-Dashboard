import React, { Suspense, useEffect } from 'react';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useLocalStorage from './hooks/useLocalStorage';
import { ROUTES } from './constants/routes';
import SubLayout from './layouts/SubLayout';
import ErrorPage from './pages/error/ErrorPage.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import RoleProtectedRoute from './routes/RoleProtectedRoute.jsx';

const Home = React.lazy(() => import('./pages/home/Home'));
const MainLayout = React.lazy(() => import('./layouts/MainLayout'));
const Reports = React.lazy(() => import('./pages/reports/Reports'));
const Login = React.lazy(() => import('./pages/authentication/Login'));
const Settings = React.lazy(() => import('./pages/settings/Settings'));
const Loading = React.lazy(() => import('./pages/status-pages/Loading'));
const SalesAnalysis = React.lazy(() => import('./pages/sales-analysis/SalesAnalysis'));
const AdminProfile = React.lazy(() => import('./pages/admins-management/AdminProfile'));
const AddAdmin = React.lazy(() => import('./pages/admins-management/admins-actions/AddAdmin'));
const RatesManagement = React.lazy(() => import('./pages/rates-management/RatesManagement'));
const UsersManagement = React.lazy(() => import('./pages/users-management/UsersManagement'));
const UsersSetting = React.lazy(() => import('./pages/settings/setting-actions/UsersSetting'));
const OrdersManagement = React.lazy(() => import('./pages/orders-management/OrdersManagement'));
const AdminsManagement = React.lazy(() => import('./pages/admins-management/AdminsManagement'));
const PolicySetting = React.lazy(() => import('./pages/settings/setting-actions/PolicySetting'));
const OrdersSetting = React.lazy(() => import('./pages/settings/setting-actions/OrdersSetting'));
const MessageForm = React.lazy(() => import('./pages/users-management/message-form/MessageForm'));
const AccountSetting = React.lazy(() => import('./pages/settings/setting-actions/AccountSetting'));
const PaymentSetting = React.lazy(() => import('./pages/settings/setting-actions/PaymentSetting'));
const ArtistProfile = React.lazy(() => import('./pages/users-management/profiles/artist/ArtistProfile'));
const ClientProfile = React.lazy(() => import('./pages/users-management/profiles/client/ClientProfile'));
const OverView = React.lazy(() => import('./pages/users-management/profiles/client/profile-actions/OverView'));
const ClientLog = React.lazy(() => import('./pages/users-management/profiles/client/profile-actions/ClientLog'));
const ArtistLogs = React.lazy(() => import('./pages/users-management/profiles/artist/profile-actions/ArtistLogs'));
const ArtistWorks = React.lazy(() => import('./pages/users-management/profiles/artist/profile-actions/ArtistWorks'));
const ArtistRates = React.lazy(() => import('./pages/users-management/profiles/artist/profile-actions/ArtistRates'));
const ClientRates = React.lazy(() => import('./pages/users-management/profiles/client/profile-actions/ClientRates'));
const ClientOrders = React.lazy(() => import('./pages/users-management/profiles/client/profile-actions/ClientOrders'));
const ArtistReports = React.lazy(() => import('./pages/users-management/profiles/artist/profile-actions/ArtistReports'));

const routes = createHashRouter([

    {
        path: ROUTES.HOME_ROUTE, 
        element: <RoleProtectedRoute allowedRoles={['admin', 'superadmin']} redirectTo={ROUTES.LOGIN_ROUTE}>
            <MainLayout />
        </RoleProtectedRoute>, 
        children: [

            {path: ROUTES.HOME_ROUTE, element: <Home />},

            {path: ROUTES.USERS_ROUTE, element: <SubLayout />, children: [

                {path: ROUTES.USERS_ROUTE, element: <UsersManagement />},

                {path: `${ROUTES.ARTIST_PROFILE_ROUTE}/:id`, element: <ArtistProfile />, children: [
                    {index: true, element: <ArtistWorks />},
                    {path: ROUTES.ARTIST_REPORTS_ROUTE, element: <ArtistReports />},
                    {path: ROUTES.ARTIST_RATES_ROUTE, element: <ArtistRates />},
                    {path: ROUTES.ARTIST_ACTIVITY_LOG_ROUTE, element: <ArtistLogs />},
                ]},

                {path: `${ROUTES.CLIENT_PROFILE_ROUTE}/:id`, element: <ClientProfile />, children: [

                    // {index: true, element: <OverView />},
                    {index: true, element: <ClientOrders />},
                    {path: ROUTES.CLIENT_RATES_ROUTE, element: <ClientRates />},
                    {path: ROUTES.CLIENT_ACTIVITY_LOG_ROUTE, element: <ClientLog />},

                ]},

                {path: `${ROUTES.SEND_MESSAGE_ROUTE}/:id/:role`, element: <MessageForm />},

            ]},

            {
                path: ROUTES.ADMINS_ROUTE, 
                element: <RoleProtectedRoute allowedRoles={['superadmin']} redirectTo={ROUTES.LOGIN_ROUTE}>
                    <SubLayout />
                </RoleProtectedRoute>, 
                children: [
                    {index: true, element: <AdminsManagement />},
                    {path: `${ROUTES.ADMIN_ROUTE}/:id`, element: <AdminProfile />},
                    {path: ROUTES.ADD_ADMIN_ROUTE, element: <AddAdmin />},
                    {path: `${ROUTES.EDIT_ADMIN_ROUTE}/:id`, element: <AddAdmin />},
                ]
            },

            {path: ROUTES.ORDERS_ROUTE, element: <OrdersManagement />},
            {path: ROUTES.SALES_ANALYSIS_ROUTE, element: <SalesAnalysis />},
            {path: ROUTES.RATES_ROUTE, element: <RatesManagement />},
            {path: ROUTES.REPORTS_ROUTE, element: <Reports />},

            {path: ROUTES.SETTINGS_ROUTE, element: <Settings />, children: [
                {index: true, element: <AccountSetting />},
                {path: ROUTES.USERS_SETTING_ROUTE, element: <UsersSetting />},
                {path: ROUTES.ORDERS_SETTING_ROUTE, element: <OrdersSetting />},
                {path: ROUTES.PAYMENT_SETTING_ROUTE, element: <PaymentSetting />},
                {path: ROUTES.POLICY_SETTING_ROUTE, element: <PolicySetting />},
            ]},

        ], 
        errorElement: <ErrorPage />
    },

    {
        path: ROUTES.LOGIN_ROUTE, 
        element: <RoleProtectedRoute redirectTo={ROUTES.HOME_ROUTE} requireAuth={false}><Login /></RoleProtectedRoute>, 
        errorElement: <ErrorPage />
    },

    {path: '*', element: <ErrorPage />},

]);

export default function App() {

    const { i18n } = useTranslation();
    const queryClient = new QueryClient();

    const [savedLang] = useLocalStorage('language', 'ar');

    useEffect(() => {

        if (savedLang && i18n.language !== savedLang) {
            i18n.changeLanguage(savedLang);
        }
    
        document.documentElement.lang = i18n.language;
        document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';

    }, [i18n, i18n.language, savedLang]);

    useEffect(() => {

        import('./pages/home/Home');
        import('./pages/users-management/UsersManagement.jsx');
        import('./pages/admins-management/AdminsManagement.jsx');
        import('./pages/orders-management/OrdersManagement.jsx');
        import('./pages/sales-analysis/SalesAnalysis.jsx');
        import('./pages/rates-management/RatesManagement.jsx');
        import('./pages/settings/Settings.jsx');

    })

    return <React.Fragment>

        <QueryClientProvider client={queryClient}>
            <Suspense fallback={<Loading />}>
                <RouterProvider router={routes} />
            </Suspense>
        </QueryClientProvider>

    </React.Fragment>

}
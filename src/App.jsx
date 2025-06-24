import React, { Suspense, useEffect } from 'react';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useLocalStorage from './hooks/useLocalStorage';
import { ROUTES } from './constants/routes';
import SubLayout from './layouts/SubLayout';

const Home = React.lazy(() => import('./pages/home/Home'));
const MainLayout = React.lazy(() => import('./layouts/MainLayout'));
const Login = React.lazy(() => import('./pages/authentication/Login'));
const Loading = React.lazy(() => import('./pages/status-pages/Loading'));
const UsersManagement = React.lazy(() => import('./pages/users-management/UsersManagement'));
const ArtistProfile = React.lazy(() => import('./pages/users-management/profiles/artist/ArtistProfile'));
const ClientProfile = React.lazy(() => import('./pages/users-management/profiles/client/ClientProfile'));

const routes = createHashRouter([

    {path: ROUTES.HOME_ROUTE, element: <MainLayout />, children: [

        {path: ROUTES.HOME_ROUTE, element: <Home />},
        {path: ROUTES.USERS_ROUTE, element: <SubLayout />, children: [
            {path: ROUTES.USERS_ROUTE, element: <UsersManagement />},
            {path: `${ROUTES.ARTIST_PROFILE_ROUTE}/:id`, element: <ArtistProfile />, errorElement: <div>404</div>},
            {path: `${ROUTES.CLIENT_PROFILE_ROUTE}/:id`, element: <ClientProfile />, errorElement: <div>404</div>},
        ]},
        {path: ROUTES.ORDERS_ROUTE, element: <h1>صفحة الطلبات</h1>},
        {path: ROUTES.SALES_ANALYSIS_ROUTE, element: <h1>صفحة تحليل المبيعات</h1>},
        {path: ROUTES.RATES_ROUTE, element: <h1>صفحة التقييمات</h1>},
        {path: ROUTES.REPORTS_ROUTE, element: <h1>صفحة التقارير</h1>},
        {path: ROUTES.SETTINGS_ROUTE, element: <h1>صفحة اعدادات النظام</h1>},

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
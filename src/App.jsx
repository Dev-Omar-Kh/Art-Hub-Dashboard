import React, { Suspense, useEffect } from 'react';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import Loading from './pages/status-pages/Loading';
import { useTranslation } from 'react-i18next';
import useLocalStorage from './hooks/useLocalStorage';

const MainLayout = React.lazy(() => import('./layouts/MainLayout'));
const Login = React.lazy(() => import('./pages/authentication/Login'));

const routes = createHashRouter([

    {path: '/', element: <MainLayout />, children: [

        {path: '', element: <div>Home Page</div>},

    ], errorElement: <div>404</div>},

    {path: '/login', element: <Login />, errorElement: <div>404</div>},

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
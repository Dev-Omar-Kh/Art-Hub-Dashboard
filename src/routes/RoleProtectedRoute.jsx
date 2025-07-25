import {jwtDecode} from 'jwt-decode';
import { Navigate } from 'react-router-dom';
import { ROUTES } from '../constants/routes';

export default function RoleProtectedRoute({children, allowedRoles=[], redirectTo=ROUTES.LOGIN_ROUTE, requireAuth=true}){

    const token = sessionStorage.getItem('token');

    if (!requireAuth && token) {
        try {
            const decoded = jwtDecode(token);
            const now = Date.now() / 1000;
            
            if (decoded.exp && decoded.exp >= now) {
                return <Navigate to={redirectTo} />;
            } else {
                sessionStorage.removeItem('token');
            }
        } catch (error) {
            console.error('Error decoding token:', error);
            sessionStorage.removeItem('token');
        }
    }

    if (requireAuth && !token) {
        return <Navigate to={ROUTES.LOGIN_ROUTE} />;
    }

    if (!requireAuth && !token) {
        return children;
    }

    try {

        const decoded = jwtDecode(token);
        const now = Date.now() / 1000;

        if (decoded.exp && decoded.exp < now) {
            sessionStorage.removeItem('token');
            return <Navigate to={ROUTES.LOGIN_ROUTE} />;
        }

        const userRole = decoded?.role;
        if (requireAuth && allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
            return <Navigate to={redirectTo} />;
        }

        return children;

    } 
    catch (error) {
        console.error('Error decoding token:', error);
        sessionStorage.removeItem('token');
        return <Navigate to={ROUTES.LOGIN_ROUTE} />;
    }

}
import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAdmin from '../../Components/MyHooks/useAdmin/useAdmin';
import Spinner from '../../Components/Pages/Spinner/Spinner';
import { AuthContext } from '../../Contexts/AuthProvider/AuthProvider';

const AdminRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const [isAdmin, adminLoading] = useAdmin(user?.email);
    const location = useLocation();

    if (loading || adminLoading) {
        return <Spinner />;
    }
    if (user && isAdmin) {
        return children;
    }
    return <Navigate to='/logIn' state={{ from: location }} replace />
};

export default AdminRoute;
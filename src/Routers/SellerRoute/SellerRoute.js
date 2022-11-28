import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAdmin from '../../Components/MyHooks/useAdmin/useAdmin';
import Spinner from '../../Components/Pages/Spinner/Spinner';
import { AuthContext } from '../../Contexts/AuthProvider/AuthProvider';

const AdminRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const [isSeller, sellerLoading] = useAdmin(user?.email);
    const location = useLocation();

    if (loading || sellerLoading) {
        return <Spinner />;
    }
    if (user && isSeller) {
        return children;
    }
    return <Navigate to='/logIn' state={{ from: location }} replace />
};

export default AdminRoute;
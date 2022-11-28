import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useSeller from '../../Components/MyHooks/useSeller/useSeller';
import Spinner from '../../Components/Pages/Spinner/Spinner';
import { AuthContext } from '../../Contexts/AuthProvider/AuthProvider';

const SellerRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const [isSeller, sellerLoading] = useSeller(user?.email);
    const location = useLocation();

    if (loading || sellerLoading) {
        return <Spinner />;
    }
    if (user && isSeller) {
        return children;
    }
    return <Navigate to='/logIn' state={{ from: location }} replace />
};

export default SellerRoute;
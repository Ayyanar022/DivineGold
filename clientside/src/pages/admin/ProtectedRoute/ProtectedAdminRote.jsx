import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { useGetMyUser } from '../../../api/MyUserApi';


const ProtectedAdminRote = () => {
    const { isAuthenticated } = useAuth0();
    const { currentUser, isLoading: isUpdateLoading } = useGetMyUser();

    if (isUpdateLoading) {
        return <div>Loading...</div>; // Optional loading state
    }

    // Check if user is authenticated and is an admin
    const isAdmin = isAuthenticated && currentUser?.role === 'ADMIN_AYAN';

    return isAdmin ? <Outlet /> : <Navigate to="/not-authorized" />;
};

export default ProtectedAdminRote;

import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRouteForAdmin = ({ children }) => {
    const user = JSON.parse(localStorage.getItem('users'));

    if (!user || user.role !== 'admin') {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export { ProtectedRouteForAdmin };
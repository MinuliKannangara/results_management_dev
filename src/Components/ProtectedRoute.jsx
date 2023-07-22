import React, { useContext } from "react";
import { Route, Navigate } from "react-router-dom";
import { AuthContext } from '../helpers/AuthContext';

const ProtectedRoute = ({ component: Component, allowedRoles, redirectTo, ...rest }) => {
    const { authState } = useContext(AuthContext);

    const isRoleAllowed = allowedRoles.includes(authState.role);

    return (
        <Route {...rest} element={isRoleAllowed ? <Component /> : <Navigate to={redirectTo} replace />} />
    );
};

export default ProtectedRoute;

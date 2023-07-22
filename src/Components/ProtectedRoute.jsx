import React from "react";
import { Route, Navigate } from "react-router-dom";

const ProtectedRoute = ({ element: Component, allowedRoles, redirectTo, ...rest}) => {
    const {authState} = useContext(AuthContext);

    const isRoleAllowd = allowedRoles.includes(authState.role);

    return (
        <Route {...rest} element={isRoleAllowd ? <Component /> : <Navigate to={redirectTo} replace />} />
    );
};

export default ProtectedRoute;
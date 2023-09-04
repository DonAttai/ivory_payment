import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useUser } from "../store/user-store";
export const PrivateRoute = ({ allowedRoles }) => {
  const user = useUser();

  const location = useLocation();

  return user?.roles.find((role) => allowedRoles.includes(role)) ? (
    <Outlet />
  ) : user ? (
    <Navigate to="/" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

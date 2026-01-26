import { Navigate, Outlet } from "react-router-dom";
import { isAdminLoggedIn } from "../../utilis/adminAuth";

/**
 * Protects all admin routes.
 * If not logged in → redirect to login
 * If logged in → render admin pages
 */
const AdminRouteGuard = () => {
  if (!isAdminLoggedIn()) {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
};

export default AdminRouteGuard;

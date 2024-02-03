import { Navigate, Outlet, useLocation } from "react-router-dom";
import { isAuthenticated } from "@/identity/helpers";

/**
 * The Require Auth component allows you to only display
 * content to users that have the required token.
 */
export default function RequireAuth() {
  const location = useLocation();
  return isAuthenticated() ? (
    <Outlet />
  ) : (
    <Navigate to="sign-in" state={{ from: location }} replace />
  );
}

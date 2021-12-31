import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
export default function PublicRoute({
  children,
  restricted = false,
  redirectTo = "/",
}) {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const shouldRedirect = restricted && isLoggedIn;
  return !shouldRedirect ? children : <Navigate to={redirectTo} />;
}

import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { isUserLoggedIn } from "../../redux/User/user-selectors";
export default function PublicRoute({
  children,
  restricted = false,
  redirectTo = "/",
}) {
  const isLoggedIn = useSelector(isUserLoggedIn);
  const shouldRedirect = restricted && isLoggedIn;
  return !shouldRedirect ? children : <Navigate to={redirectTo} />;
}

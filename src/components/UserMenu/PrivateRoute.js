import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { isUserLoggedIn } from "../../redux/User/user-selectors";
export default function PrivateRoute({ children, redirectTo = "" }) {
  const isLoggedIn = useSelector(isUserLoggedIn);
  return isLoggedIn ? children : <Navigate to={redirectTo} />;
}

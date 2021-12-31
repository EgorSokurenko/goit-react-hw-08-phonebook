import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
export default function PrivateRoute({ children, redirectTo = "" }) {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  return isLoggedIn ? children : <Navigate to={redirectTo} />;
}

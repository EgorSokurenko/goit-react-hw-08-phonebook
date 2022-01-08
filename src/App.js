import { lazy, Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, Link } from "react-router-dom";
import PrivateRoute from "./components/UserMenu/PrivateRoute";
import PublicRoute from "./components/UserMenu/PublicRouter";
import NavBar from "./components/page/NavBar";
import { current } from "./redux/User/user-operations";
import { isUserLoggedIn } from "./redux/User/user-selectors";
const ContactForm = lazy(() => import("./components/page/ContactForm"));
const Filter = lazy(() => import("./components/views/Filter/"));
const ContactList = lazy(() => import("./components/page/ContactList/"));
const RegisterForm = lazy(() =>
  import("./components/views/RegisterForm/RegisterForm")
);
const LoginForm = lazy(() => import("./components/views/LoginForm/LoginForm"));
const HomeView = lazy(() => import("./components/page/HomeView/HomeView"));

export default function App() {
  const isLoggedIn = useSelector(isUserLoggedIn);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(current());
  }, [dispatch]);
  return (
    <>
      {isLoggedIn === "pending" ? (
        <>Skeleton</>
      ) : (
        <div>
          <NavBar />
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route
                exact
                path="/"
                element={
                  <PublicRoute>
                    <HomeView />
                  </PublicRoute>
                }
              />
              {isLoggedIn === "pending" ? (
                <>loading</>
              ) : (
                <Route
                  path="/add-form"
                  element={
                    <PrivateRoute redirectTo="/login">
                      <ContactForm />
                    </PrivateRoute>
                  }
                />
              )}
              {isLoggedIn === "pending" ? (
                <>load</>
              ) : (
                <Route
                  path="/contacts"
                  element={
                    <PrivateRoute redirectTo="/login">
                      <Filter />
                      <ContactList />
                    </PrivateRoute>
                  }
                />
              )}

              <Route
                exact
                path="/registration"
                element={
                  <PublicRoute restricted>
                    <RegisterForm />
                  </PublicRoute>
                }
              />
              <Route
                exact
                path="/login"
                element={
                  <PublicRoute redirectTo="/contacts" restricted>
                    <LoginForm />
                  </PublicRoute>
                }
              />
            </Routes>
          </Suspense>
        </div>
      )}
    </>
  );
}

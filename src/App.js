import { lazy, Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, Link } from "react-router-dom";
import PrivateRoute from "./components/UserMenu/PrivateRoute";
import PublicRoute from "./components/UserMenu/PublicRouter";
import NavBar from "./components/NavBar";
import { current } from "./redux/User/user-operations";
const ContactForm = lazy(() => import("./components/ContactForm"));
const Filter = lazy(() => import("./components/Filter/"));
const ContactList = lazy(() => import("./components/ContactList/"));
const RegisterForm = lazy(() =>
  import("./components/RegisterForm/RegisterForm")
);
const LoginForm = lazy(() => import("./components/LoginForm/LoginForm"));
const HomeView = lazy(() => import("./components/HomeView/HomeView"));

export default function App() {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(current());
  }, [dispatch]);
  return (
    <>
      {isLoggedIn === "pending" ? (
        <>LOX</>
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
              {isLoggedIn !== true ? (
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
              {isLoggedIn !== true ? (
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
                  <PublicRoute restricted>
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

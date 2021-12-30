import { lazy, Suspense } from "react";
import { Routes, Route, Link } from "react-router-dom";
import NavBar from "./components/NavBar";
const ContactForm = lazy(() => import("./components/ContactForm"));
const Filter = lazy(() => import("./components/Filter/"));
const ContactList = lazy(() => import("./components/ContactList/"));
const RegisterForm = lazy(() =>
  import("./components/RegisterForm/RegisterForm")
);
const LoginForm = lazy(() => import("./components/LoginForm/LoginForm"));

export default function App() {
  return (
    <div>
      <NavBar />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<ContactForm />} />
          <Route path="/contacts" element={<ContactList />} />
          <Route path="/registration" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />} />
        </Routes>
      </Suspense>
    </div>
  );
}

import "./App.css";

import {Routes, Route} from "react-router-dom";
import HomePage from "./pages/HomePage";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import Login from "./pages/Login/Login";
import Layout from "./components/Layout/Layout";
import Resources from "./pages/Resource";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import About from "./pages/About";
import AdminDashboard from "./pages/Admin/Home/Home";
import NurseDashboard from "./pages/Nurse/Home/NurseDashboard";
import ProtectedRoute from "./components/ProtectRoute/ProtectRoute";
import MainLayout from "./components/MainLayout/MainLayout";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="resetpassword" element={<ResetPassword />} />
          <Route path="login" element={<Login />}>
            <Route path="resetpassword" element={<ResetPassword />} />
          </Route>
          <Route path="resources" element={<Resources />} />
          <Route path="blog" element={<Blog />} />
          <Route path="contact" element={<Contact />} />
          <Route path="about" element={<About />} />
        </Route>
        {/* Trang Home cho Admin */}
        <Route
          path="admin"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <MainLayout />
            </ProtectedRoute>
          }
        />
        {/* Trang Home cho Nurse */}
        <Route
          path="nurse"
          element={
            <ProtectedRoute allowedRoles={["nurse"]}>
              <NurseDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;

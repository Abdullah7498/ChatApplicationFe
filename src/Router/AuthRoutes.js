import React, { useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import SignUp from "../pages/Auth/SignUp";
import Login from "../pages/Auth/Login";
import VerifyOtp from "../pages/Auth/VerifyOtp";
import ForgotPass from "../pages/Auth/ForgotPass";

function AuthRoutes() {
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === "/") navigate("login");
  }, []);
  return (
    <AuthLayout>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/forgot-password" element={<ForgotPass />} />
      </Routes>
    </AuthLayout>
  );
}

export default AuthRoutes;

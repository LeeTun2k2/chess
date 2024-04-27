import React, { Fragment } from "react";
import { Route } from "react-router-dom";
import ForgotPasswordPage from "../pages/auth/forgot_password";
import LoginPage from "../pages/auth/login";
import LogoutPage from "../pages/auth/logout";
import RegisterPage from "../pages/auth/register";
import ResetPasswordPage from "../pages/auth/reset_password";

const AuthRoutes = () => {
  return (
    <Fragment>
      <Route path="login" element={<LoginPage />} />
      <Route path="register" element={<RegisterPage />} />
      <Route path="forgot-password" element={<ForgotPasswordPage />} />
      <Route path="reset-password" element={<ResetPasswordPage />} />
      <Route path="reset-password" element={<ResetPasswordPage />} />
      <Route path="logout" element={<LogoutPage />} />
    </Fragment>
  );
};

export default AuthRoutes;

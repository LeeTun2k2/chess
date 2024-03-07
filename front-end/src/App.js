import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes} from "react-router-dom";
import { ChakraProvider } from '@chakra-ui/react'
import TestPage from "./pages/test";
import GamePage from "./pages/game";
import LoginPage from "./pages/auth/login";
import RegisterPage from "./pages/auth/register";
import ForgotPasswordPage from "./pages/auth/forgot_password";
import ResetPasswordPage from "./pages/auth/reset_password";
import ErrorPage from "./pages/error";
import NotFoundPage from "./pages/error/404";
import InternalServerErrorPage from "./pages/error/500";
import UserProfile from "./pages/user/user_profile";

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Routes>
          {/* Home Pages */}
          <Route exact path="/" element={<TestPage/>}/>

          {/* Auth Pages */}
          <Route exact path="/auth/login" element={<LoginPage/>}/>
          <Route exact path="/auth/register" element={<RegisterPage/>}/>
          <Route exact path="/auth/forgot-password" element={<ForgotPasswordPage/>}/>
          <Route exact path="/auth/reset-password" element={<ResetPasswordPage/>}/>

          {/* User Pages */}
          <Route exact path="/profile/:username" element={<UserProfile/>}/>

          {/* Game Pages */}
          <Route exact path="/game/:id" element={<GamePage/>}/>

          {/* Error Pages */}
          <Route path="/error" element={<ErrorPage />} />
          <Route path="/not-found" element={<NotFoundPage />} />
          <Route path="/internal-server-error" element={<InternalServerErrorPage />} />
          
          {/* Catch-All Route for 404 Not Found */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;

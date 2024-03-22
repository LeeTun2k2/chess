import React, { Fragment, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import TestPage from "./pages/test";
import LoginPage from "./pages/auth/login";
import RegisterPage from "./pages/auth/register";
import ForgotPasswordPage from "./pages/auth/forgot_password";
import ResetPasswordPage from "./pages/auth/reset_password";
import ErrorPage from "./pages/error";
import NotFoundPage from "./pages/error/404";
import InternalServerErrorPage from "./pages/error/500";
import HomePage from "./pages/home";
import UserProfile from "./pages/user/user_profile";
import LobbyPage from "./pages/game/lobby";
import WaitingGamePage from "./pages/game/waitingGame";
import GameSettingsPage from "./pages/game/gameSettingsPage";
import OnlineGamePage from "./pages/game/online-game";
import TournamentsPage from "./pages/tournament/tournaments";
import BlogListPage from "./pages/club/blog_list";
import BlogPage from "./pages/club/blog";
import LogoutPage from "./pages/auth/logout";
import { getUserData } from "./lib/auth";

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);

  return (
    <Router>
      <Routes>
        {/* Home Page */}
        <Route exact path="/" element={<HomePage />} />

        {/* Test Page */}
        <Route exact path="/test" element={<TestPage />} />

        {/* Auth Pages */}
        <Route exact path="/login" element={<LoginPage setLoggedIn={setLoggedIn} />} />
        <Route exact path="/register" element={<RegisterPage />} />
        <Route exact path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route exact path="/reset-password" element={<ResetPasswordPage />} />
        <Route exact path="/reset-password" element={<ResetPasswordPage />} />
        <Route exact path="/logout" element={<LogoutPage setLoggedIn={setLoggedIn} />} />

        {/* Club Pages */}
        <Route exact path="/blogs" element={<BlogListPage />} />
        <Route exact path="/blog/:slug" element={<BlogPage />} />

        {/* Error Pages */}
        <Route path="/error" element={<ErrorPage />} />
        <Route path="/not-found" element={<NotFoundPage />} />
        <Route
          path="/internal-server-error"
          element={<InternalServerErrorPage />}
        />

        {/* Catch-All Route for 404 Not Found */}
        <Route path="*" element={<NotFoundPage />} />

        {/* User Pages */}
        <Route exact path="/profile" element={isLoggedIn ? <UserProfile /> : <Navigate to={"/login"} />} />

        {/* Game Pages */}
        <Route exact path="/lobby" element={isLoggedIn ? <LobbyPage /> : <Navigate to={"/login"} />} />
        <Route exact path="/wait/:id" element={isLoggedIn ? <WaitingGamePage /> : <Navigate to={"/login"} />} />
        <Route exact path="/new-game" element={isLoggedIn ? <GameSettingsPage /> : <Navigate to={"/login"} />} />
        <Route exact path="/online/:id" element={isLoggedIn ? <OnlineGamePage /> : <Navigate to={"/login"} />} />

        {/* Tournament Pages */}
        <Route exact path="/tournaments" element={isLoggedIn ? <TournamentsPage /> : <Navigate to={"/login"} />} />
      </Routes>
    </Router>
  );
}

export default App;

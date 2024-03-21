import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes} from "react-router-dom";
import TestPage from "./pages/test";
import OnlineGamePage from "./pages/game/online-game";
import LoginPage from "./pages/auth/login";
import RegisterPage from "./pages/auth/register";
import ForgotPasswordPage from "./pages/auth/forgot_password";
import ResetPasswordPage from "./pages/auth/reset_password";
import ErrorPage from "./pages/error";
import NotFoundPage from "./pages/error/404";
import InternalServerErrorPage from "./pages/error/500";
import UserProfile from "./pages/user/user_profile";
import HomePage from "./pages/home";
import BlogListPage from "./pages/club/blog_list";
import BlogPage from "./pages/club/blog";
import LogoutPage from "./pages/auth/logout";
import LobbyPage from "./pages/game/lobby";
import TournamentsPage from "./pages/tournament/tournaments";
import GameSettingsPage from "./pages/game/gameSettingsPage";
import WaitingGamePage from "./pages/game/waitingGame";

function App() {
  return (
      <Router>
        <Routes>
          {/* Home Pages */}
          <Route exact path="/" element={<HomePage/>}/>

          {/* Test Pages */}
          <Route exact path="/test" element={<TestPage/>}/>

          {/* Auth Pages */}
          <Route exact path="/login" element={<LoginPage/>}/>
          <Route exact path="/register" element={<RegisterPage/>}/>
          <Route exact path="/forgot-password" element={<ForgotPasswordPage/>}/>
          <Route exact path="/reset-password" element={<ResetPasswordPage/>}/>
          <Route exact path="/logout" element={<LogoutPage/>}/>

          {/* Club Pages */}
          <Route exact path="/blogs" element={<BlogListPage/>}/>
          <Route exact path="/blog/:slug" element={<BlogPage/>}/>

          {/* User Pages */}
          <Route exact path="/profile/:username" element={<UserProfile/>}/>

          {/* Game Pages */}
          <Route exact path="/lobby" element={<LobbyPage/>}/>
          <Route exact path="/wait/:id" element={<WaitingGamePage/>}/>
          <Route exact path="/new-game" element={<GameSettingsPage/>}/>
          <Route exact path="/online/:id" element={<OnlineGamePage/>}/>

          {/* Tournament Pages */}
          <Route exact path="/tournaments" element={<TournamentsPage/>}/>

          {/* Error Pages */}
          <Route path="/error" element={<ErrorPage />} />
          <Route path="/not-found" element={<NotFoundPage />} />
          <Route path="/internal-server-error" element={<InternalServerErrorPage />} />
          
          {/* Catch-All Route for 404 Not Found */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
  );
}

export default App;

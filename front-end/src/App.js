import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
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
import BlogListPage from "./pages/club/blogs";
import BlogPage from "./pages/club/blog";
import CreateBlogPage from "./pages/club/create_blog";
import LogoutPage from "./pages/auth/logout";
import AboutPage from "./pages/common/about";
import DonatePage from "./pages/club/donate";
import AchievementsPage from "./pages/club/achievements";
import { gapi } from "gapi-script";
import { getUserData } from "./lib/auth";
import AdminDashboardPage from "./pages/admin";
import AdminBlogsPage from "./pages/admin/blogs";
import AdminBooksPage from "./pages/admin/books";
import AdminTournamentsPage from "./pages/admin/tournaments";
import AdminUsersPage from "./pages/admin/users";
import AdminVideosPage from "./pages/admin/videos";
import AdminCreateBlogsPage from "./pages/admin/blogs/create_blog";
import AdminUpdateBlogPage from "./pages/admin/blogs/update_blog";
import AdminCreateBookPage from "./pages/admin/books/create_book";
import AdminUpdateBookPage from "./pages/admin/books/update_book";
import AdminCreateTournamentPage from "./pages/admin/tournaments/create_tournament";
import AdminUpdateTournamentPage from "./pages/admin/tournaments/update_tournament";
import AdminCreateVideoPage from "./pages/admin/videos/create_video";
import AdminUpdateVideoPage from "./pages/admin/videos/update_video";
import SettingsPage from "./pages/common/settings";
import LessonsPage from "./pages/practice/lessons";
import LessonsDetailPage from "./pages/practice/lesson_detail";
import AdminAchievementsPage from "./pages/admin/achievements";
import AdminCreateAchievementPage from "./pages/admin/achievements/create_achievement";
import AdminUpdateAchievementPage from "./pages/admin/achievements/update_achievement";
import AdminCreateLessonPage from "./pages/admin/lessons/create_lesson";
import AdminPage from "./pages/admin/users/admin";

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);

  const initializeGapi = () => {
    gapi.client.init({
      clientId:
        "792034127875-ia2do320uupm2vvi5amm83b8kkbr9l2q.apps.googleusercontent.com",
      scope: "",
    });
  };

  const user = getUserData();
  useEffect(() => {
    // load and init google api scripts
    gapi.load("client:auth2", initializeGapi);
  }, []);

  return (
    <Router>
      <Routes>
        {/* Home Page */}
        <Route exact path="/" element={<HomePage />} />

        {/* Test Page */}
        <Route exact path="/test" element={<TestPage />} />

        {/* Auth Pages */}
        <Route
          exact
          path="/login"
          element={<LoginPage setLoggedIn={setLoggedIn} />}
        />
        <Route exact path="/register" element={<RegisterPage />} />
        <Route exact path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route exact path="/reset-password" element={<ResetPasswordPage />} />
        <Route exact path="/reset-password" element={<ResetPasswordPage />} />
        <Route
          exact
          path="/logout"
          element={<LogoutPage setLoggedIn={setLoggedIn} />}
        />

        {/* Club Pages */}
        <Route exact path="/blogs" element={<BlogListPage />} />
        <Route exact path="/blog/:slug" element={<BlogPage />} />
        <Route exact path="/blog/create-blog" element={<CreateBlogPage />} />

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
        <Route
          exact
          path="/profile"
          element={
            isLoggedIn || user?.id ? (
              <UserProfile />
            ) : (
              <Navigate to={"/login"} />
            )
          }
        />

        {/* Game Pages */}
        <Route
          exact
          path="/lobby"
          element={
            isLoggedIn || user?.id ? <LobbyPage /> : <Navigate to={"/login"} />
          }
        />
        <Route
          exact
          path="/wait/:id"
          element={
            isLoggedIn || user?.id ? (
              <WaitingGamePage />
            ) : (
              <Navigate to={"/login"} />
            )
          }
        />
        <Route
          exact
          path="/new-game"
          element={
            isLoggedIn || user?.id ? (
              <GameSettingsPage />
            ) : (
              <Navigate to={"/login"} />
            )
          }
        />
        <Route
          exact
          path="/online/:id"
          element={
            isLoggedIn || user?.id ? (
              <OnlineGamePage />
            ) : (
              <Navigate to={"/login"} />
            )
          }
        />

        {/* Tournament Pages */}
        <Route
          exact
          path="/tournaments"
          element={
            isLoggedIn || user?.id ? (
              <TournamentsPage />
            ) : (
              <Navigate to={"/login"} />
            )
          }
        />

        {/* Common Pages */}
        <Route exact path="/about" element={<AboutPage />} />
        <Route exact path="/donate" element={<DonatePage />} />
        <Route exact path="/achievements" element={<AchievementsPage />} />
        <Route exact path="/settings" element={<SettingsPage />} />
        <Route exact path="/lessons" element={<LessonsPage />} />
        <Route path="/lessons/:lessonId" element={<LessonsDetailPage />} />

        {/* Admin page */}
        <Route exact path="/admin" element={<AdminDashboardPage />} />

        <Route exact path="/admin/blogs" element={<AdminBlogsPage />} />
        <Route
          exact
          path="/admin/create-blog"
          element={<AdminCreateBlogsPage />}
        />
        <Route
          exact
          path="/admin/update-blog/:id"
          element={<AdminUpdateBlogPage />}
        />

        <Route exact path="/admin/books" element={<AdminBooksPage />} />
        <Route
          exact
          path="/admin/create-book"
          element={<AdminCreateBookPage />}
        />
        <Route
          exact
          path="/admin/update-book/:id"
          element={<AdminUpdateBookPage />}
        />

        <Route
          exact
          path="/admin/tournaments"
          element={<AdminTournamentsPage />}
        />
        <Route
          exact
          path="/admin/create-tournament"
          element={<AdminCreateTournamentPage />}
        />
        <Route
          exact
          path="/admin/update-tournament/:id"
          element={<AdminUpdateTournamentPage />}
        />

        <Route
          exact
          path="/admin/achievements"
          element={<AdminAchievementsPage />}
        />
        <Route
          exact
          path="/admin/create-achievement"
          element={<AdminCreateAchievementPage />}
        />
        <Route
          exact
          path="/admin/update-achievement/:id"
          element={<AdminUpdateAchievementPage />}
        />

        <Route exact path="/admin/users" element={<AdminUsersPage />} />
        <Route exact path="/admin/admins" element={<AdminPage />} />

        <Route exact path="/admin/videos" element={<AdminVideosPage />} />
        <Route
          exact
          path="/admin/create-video"
          element={<AdminCreateVideoPage />}
        />
        <Route
          exact
          path="/admin/update-video/:id"
          element={<AdminUpdateVideoPage />}
        />

        <Route path="/admin/*" element={<Navigate to={"/admin"} />} />
        <Route
          exact
          path="/admin/create-lesson"
          element={<AdminCreateLessonPage />}
        />
      </Routes>
    </Router>
  );
}

export default App;

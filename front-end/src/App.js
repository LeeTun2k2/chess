import { gapi } from "gapi-script";
import React, { useEffect, useState } from "react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import { CometChat } from "@cometchat-pro/chat";
import { getUserData } from "./lib/auth";
import AdminDashboardPage from "./pages/admin";
import AdminAchievementsPage from "./pages/admin/achievements";
import AdminCreateAchievementPage from "./pages/admin/achievements/create_achievement";
import AdminUpdateAchievementPage from "./pages/admin/achievements/update_achievement";
import AdminBlogsPage from "./pages/admin/blogs";
import AdminCreateBlogsPage from "./pages/admin/blogs/create_blog";
import AdminUpdateBlogPage from "./pages/admin/blogs/update_blog";
import AdminBooksPage from "./pages/admin/books";
import AdminCreateBookPage from "./pages/admin/books/create_book";
import AdminUpdateBookPage from "./pages/admin/books/update_book";
import AdminClubOfflinePage from "./pages/admin/club-offline";
import AdminDonatePage from "./pages/admin/donate";
import AdminGamesPage from "./pages/admin/games";
import AdminCreateLessonPage from "./pages/admin/lessons/create_lesson";
import AdminNotificationsPage from "./pages/admin/notifications";
import AdminCreateNotificationPage from "./pages/admin/notifications/create_notification";
import AdminUpdateNotificationPage from "./pages/admin/notifications/update_notification";
import AdminPuzzlesPage from "./pages/admin/puzzles";
import AdminTournamentsPage from "./pages/admin/tournaments";
import AdminCreateTournamentPage from "./pages/admin/tournaments/create_tournament";
import AdminUpdateTournamentPage from "./pages/admin/tournaments/update_tournament";
import AdminUsersPage from "./pages/admin/users";
import AdminPage from "./pages/admin/users/admin";
import AdminVideosPage from "./pages/admin/videos";
import AdminCreateVideoPage from "./pages/admin/videos/create_video";
import AdminUpdateVideoPage from "./pages/admin/videos/update_video";
import ForgotPasswordPage from "./pages/auth/forgot_password";
import LoginPage from "./pages/auth/login";
import LogoutPage from "./pages/auth/logout";
import RegisterPage from "./pages/auth/register";
import ResetPasswordPage from "./pages/auth/reset_password";
import AchievementsPage from "./pages/club/achievements";
import BlogPage from "./pages/club/blog";
import BlogListPage from "./pages/club/blogs";
import DonatePage from "./pages/club/donate";
import AboutPage from "./pages/common/about";
import SettingsPage from "./pages/common/settings";
import ErrorPage from "./pages/error";
import NotFoundPage from "./pages/error/404";
import InternalServerErrorPage from "./pages/error/500";
import GameSettingsPage from "./pages/game/gameSettingsPage";
import LobbyPage from "./pages/game/lobby";
import OnlineGamePage from "./pages/game/online-game";
import WaitingGamePage from "./pages/game/waitingGame";
import HomePage from "./pages/home";
import BookPage from "./pages/practice/book";
import BookListPage from "./pages/practice/books";
import LessonsDetailPage from "./pages/practice/lesson_detail";
import LessonsPage from "./pages/practice/lessons";
import VideoPage from "./pages/practice/video";
import VideoListPage from "./pages/practice/videos";
import TestPage from "./pages/test";
import TournamentPage from "./pages/tournament/tournament";
import TournamentsPage from "./pages/tournament/tournaments";
import TvPage from "./pages/tv";
import UserProfile from "./pages/user/user_profile";
import FriendList from "./pages/friend/friends";
import ChatPage from "./pages/friend/chat";
function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);

  const initializeGapi = () => {
    gapi.client.init({
      clientId:
        "792034127875-ia2do320uupm2vvi5amm83b8kkbr9l2q.apps.googleusercontent.com",
      scope: "",
    });
    let appID = "25617120a1512061";
    let region = "us";
    let appSetting = new CometChat.AppSettingsBuilder()
                    .subscribePresenceForAllUsers()
                    .setRegion(region)
                    .autoEstablishSocketConnection(true)
                    .build();
    CometChat.init(appID, appSetting);
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
        <Route exact path="/blog/:id" element={<BlogPage />} />

        {/* Pratice */}
        <Route exact path="/books" element={<BookListPage />} />
        <Route exact path="/book/:id" element={<BookPage />} />
        <Route exact path="/videos" element={<VideoListPage />} />
        <Route exact path="/video/:id" element={<VideoPage />} />

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

        <Route
          exact
          path="/tournament/:id"
          element={
            isLoggedIn || user?.id ? (
              <TournamentPage />
            ) : (
              <Navigate to={"/login"} />
            )
          }
        />

        {/* TV Page */}
        <Route
          exact
          path="/tv"
          element={
            isLoggedIn || user?.id ? <TvPage /> : <Navigate to={"/login"} />
          }
        />

        {/* Common Pages */}
        <Route exact path="/about" element={<AboutPage />} />
        <Route exact path="/donate" element={<DonatePage />} />
        <Route exact path="/achievements" element={<AchievementsPage />} />
        <Route exact path="/settings" element={<SettingsPage />} />
        <Route exact path="/lessons" element={<LessonsPage />} />
        <Route path="/lessons/:lessonId" element={<LessonsDetailPage />} />
        <Route path="/friends" element={<FriendList />} />
        <Route path="/chat" element={<ChatPage />} />

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
        <Route exact path="/admin/notifications" element={<AdminNotificationsPage />} />
        <Route
          exact
          path="/admin/create-notification"
          element={<AdminCreateNotificationPage />}
        />
        <Route
          exact
          path="/admin/update-notification/:id"
          element={<AdminUpdateNotificationPage />}
        />
        <Route exact path="/admin/puzzles" element={<AdminPuzzlesPage />} />
        <Route exact path="/admin/games" element={<AdminGamesPage />} />

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
        <Route exact path="/admin/donate" element={<AdminDonatePage />} />
        <Route exact path="/admin/club-offline" element={<AdminClubOfflinePage />} />

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

import React, { useEffect } from "react";
import {
  Route,
  BrowserRouter as Router,
  Routes
} from "react-router-dom";
import AdminLayout from "./components/layouts/adminLayout";
import AuthLayout from "./components/layouts/authLayout";
import ClientLayout from "./components/layouts/clientLayout";
import { getUserData } from "./lib/auth";
import { initializeCometChat } from "./lib/cometchat";
import { initializeGapi } from "./lib/gapi";
import AdminRoutes from "./routes/adminRoutes";
import AuthRoutes from "./routes/authRoutes";
import ClientRoutes from "./routes/clientRoutes";
import CommonRoutes from "./routes/commonRoutes";
import ErrorRoutes from "./routes/errorRoutes";

function App() {
  const user = getUserData();

  useEffect(() => {
    initializeGapi()
    initializeCometChat()
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthLayout/>}>
          {AuthRoutes()}
        </Route>

        <Route path="/" element={<ClientLayout/>}>
          {CommonRoutes()}
          {ClientRoutes()}
        </Route>

        <Route path="/admin" element={<AdminLayout/>}>
          {AdminRoutes()}
        </Route>

        <Route path="*">
          {ErrorRoutes()}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

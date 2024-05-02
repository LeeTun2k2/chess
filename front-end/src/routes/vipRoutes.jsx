import React, { Fragment } from "react";
import { Navigate, Outlet, Route } from "react-router-dom";
import HomePage from "../pages/home";
import CountDownPage from "../pages/vip/countDown";
import HastePage from "../pages/vip/haste";
import InfinityPage from "../pages/vip/infinity";
import RatedPage from "../pages/vip/rated";
import RepetitionPage from "../pages/vip/repetition";
import SpeedRunPage from "../pages/vip/speedRun";
import ThreePage from "../pages/vip/three";

const VipRoutes = ({ user }) => {
  return (
    <Fragment>
      <Route index element={<HomePage />} />
      <Route element={!!user ? <Outlet /> : <Navigate to="/vip" />}>
        <Route path="haste" element={<HastePage />} />
        <Route path="three" element={<ThreePage />} />
        <Route path="count-down" element={<CountDownPage />} />
        <Route path="speed-run" element={<SpeedRunPage />} />
        <Route path="rated" element={<RatedPage />} />
        <Route path="infinity" element={<InfinityPage />} />
        <Route path="repetition" element={<RepetitionPage />} />
      </Route>
    </Fragment>
  );
};

export default VipRoutes;

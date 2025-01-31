import React from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import USERS from "../layouts/USERS";
// import Home from "../pages/Home";
// import Dashboard from "../pages/Dashboard";

function AppRoutes() {
  return (
    <MainLayout>
      <Routes>
        <Route index path="/" element={<USERS />} />
      </Routes>
    </MainLayout>
  );
}

export default AppRoutes;

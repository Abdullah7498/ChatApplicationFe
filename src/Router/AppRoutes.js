import React from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import USERS from "../layouts/USERS";

function AppRoutes() {
  return (
    <MainLayout>
      <Routes>
        <Route index path="/chats" element={<USERS />} />
      </Routes>
    </MainLayout>
  );
}

export default AppRoutes;

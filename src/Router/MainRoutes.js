import React from "react";
import { useSelector } from "react-redux";
import AuthRoutes from "./AuthRoutes";
import AppRoutes from "./AppRoutes";

function MainRoutes() {
  const { token } = useSelector((state) => state?.auth);

  return <>{token ? <AppRoutes /> : <AuthRoutes />}</>;
}

export default MainRoutes;

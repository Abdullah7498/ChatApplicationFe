import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Auth from "../src/pages/Auth/Auth";
import SignUp from "../src/pages/Auth/SignUp";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="auth" element={<Auth />}>
          <Route path="sign-up" element={<SignUp />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

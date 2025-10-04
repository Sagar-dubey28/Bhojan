import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./pages/Header";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import ProfilePage from "./pages/ProfilePage";
import { Toaster } from "react-hot-toast";
import AdminLogin from "./pages/admin/adminLogin";
import AdminDashBoard from "./pages/admin/adminDashBoard";

function App() {


  return (
    <>
      <Router>
        <Toaster />
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/profilePage" element={<ProfilePage />} />
          <Route path="/adminLogin" element={<AdminLogin/>} />
          <Route path="/adminDashboard" element={<AdminDashBoard/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

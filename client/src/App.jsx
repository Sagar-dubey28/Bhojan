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
import RestaurantDashboard from "./pages/RestaurantDashboard";
import Restaurants from "./home/Restaurants";
import RestaurantDetails from "./home/RestaurantDetails";
import AddToCartPage from "./pages/cart/AddToCartPage";
import PaymentSuccess from "./pages/cart/PaymentSuccess";
//sagar-dubey

//changes by github
function App() {
  console.log(
    "Backend URL:",
    "https://bhojan-r8pl.onrender.com"
  );
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
          <Route path="/adminLogin" element={<AdminLogin />} />
          <Route path="/adminDashboard" element={<AdminDashBoard />} />
          <Route path="/restaurants" element={<Restaurants />} />
          <Route path="/restaurantDetails" element={<RestaurantDetails />} />
          <Route path="/addToCart" element={<AddToCartPage />} />
          <Route path="/paymentSuccess" element={<PaymentSuccess />} />

          <Route
            path="/restaurantDashboard"
            element={<RestaurantDashboard />}
          />
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

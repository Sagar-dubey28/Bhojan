import React, { useEffect, useState } from "react";
import Sidebar from "../components/restaurantDashboard/Sidebar";
import Overview from "../components/restaurantDashboard/Overview";
import Profile from"../components/restaurantDashboard/Profile";
import Menu from "../components/restaurantDashboard/Menu";
import Orders from "../components/restaurantDashboard/Orders";
import Transactions from "../components/restaurantDashboard/Transactions";
import Feedback from "../components/restaurantDashboard/Feedback";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthProvider";

const RestaurantDashboard = () => {
  const { isLogin, isRestaurant } = useAuth();
  const navigate = useNavigate();
  const [active, setActive] = useState("overview");
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(true);

  useEffect(() => {
    console.log('Restaurant Dashboard Auth State:', { isLogin, isRestaurant });
    if (!isLogin || !isRestaurant) {
      console.log('Redirecting to home - Not authenticated as restaurant');
      navigate("/");
    }
  }, [isLogin, isRestaurant]);

  return (
    <>
      {isLogin && isRestaurant && (
        <div className="flex min-h-[91vh]">
          <div
            className={`border overflow-hidden ${
              isSideMenuOpen === true ? "w-[230px]" : "w-[60px]"
            } transition-all duration-200`}
          >
            <Sidebar
              active={active}
              setActive={setActive}
              isSideMenuOpen={isSideMenuOpen}
              setIsSideMenuOpen={setIsSideMenuOpen}
            />
          </div>
          <div className="border w-full p-4">
            {active === "overview" && <Overview />}
            {active === "profile" && <Profile />}
            {active === "menu" && <Menu  />}
            {active === "orders" && <Orders />}
            {active === "transactions" && <Transactions />}
            {active === "feedback" && <Feedback />}
          </div>
        </div>
      )}
    </>
  );
};

export default RestaurantDashboard;

import React from "react";
import { FiHome, FiUser, FiMenu, FiShoppingCart, FiCreditCard, FiMessageSquare, FiChevronLeft, FiChevronRight, FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthProvider";
import api from "../../config/api";
import toast from "react-hot-toast";

const Sidebar = ({ active, setActive, isSideMenuOpen, setIsSideMenuOpen }) => {
  const navigate = useNavigate();
  const { setIsLogin, setUser, setIsRestaurant } = useAuth();
  const items = [
    { key: "overview", label: "Overview", icon: <FiHome /> },
    { key: "profile", label: "Profile", icon: <FiUser /> },
    { key: "menu", label: "Menu", icon: <FiMenu /> },
    { key: "orders", label: "Orders", icon: <FiShoppingCart /> },
    { key: "transactions", label: "Transactions", icon: <FiCreditCard /> },
    { key: "feedback", label: "Feedback", icon: <FiMessageSquare /> },
  ];

  const restaurantLogoutFunction = async () => {
    try {
      await api.post("/auth/logout");
      setIsLogin(false);
      setUser(null);
      setIsRestaurant(false);
      sessionStorage.removeItem("BhojanUser");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Logout failed");
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between p-3 border-b">
        <div className={`font-bold ${isSideMenuOpen ? "text-lg" : "text-sm"}`}>Restaurant</div>
        <button className="btn btn-ghost btn-sm" onClick={() => setIsSideMenuOpen(!isSideMenuOpen)}>
          {isSideMenuOpen ? <FiChevronLeft /> : <FiChevronRight />}
        </button>
      </div>

      <nav className="flex-1 overflow-auto p-2 space-y-1">
        {items.map((it) => (
          <button
            key={it.key}
            onClick={() => setActive(it.key)}
            className={`w-full flex items-center gap-3 p-2 rounded ${active === it.key ? 'bg-primary text-primary-content' : 'hover:bg-base-200'}`}
          >
            <span className="text-lg">{it.icon}</span>
            {isSideMenuOpen && <span>{it.label}</span>}
          </button>
        ))}
      </nav>

      <div className="p-2 border-t">
        <button
          onClick={restaurantLogoutFunction}
          className="w-full flex items-center gap-3 p-2 rounded text-error hover:bg-error hover:text-error-content"
        >
          <span className="text-lg"><FiLogOut /></span>
          {isSideMenuOpen && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
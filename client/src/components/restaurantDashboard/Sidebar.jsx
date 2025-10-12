import React from "react";
import { FiHome, FiUser, FiMenu, FiShoppingCart, FiCreditCard, FiMessageSquare, FiChevronLeft, FiChevronRight } from "react-icons/fi";

const Sidebar = ({ active, setActive, isSideMenuOpen, setIsSideMenuOpen }) => {
  const items = [
    { key: "overview", label: "Overview", icon: <FiHome /> },
    { key: "profile", label: "Profile", icon: <FiUser /> },
    { key: "menu", label: "Menu", icon: <FiMenu /> },
    { key: "orders", label: "Orders", icon: <FiShoppingCart /> },
    { key: "transactions", label: "Transactions", icon: <FiCreditCard /> },
    { key: "feedback", label: "Feedback", icon: <FiMessageSquare /> },
  ];

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
    </div>
  );
};

export default Sidebar;
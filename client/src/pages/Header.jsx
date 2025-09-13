import { Search } from "lucide-react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header className="flex justify-between items-center px-10 py-5 bg-white shadow-sm">
      {/* Left side Logo */}
      <div className="text-orange-500 text-2xl font-bold">
        <NavLink to="/" >
          🍽️ Logo
        </NavLink></div>

      {/* Center - Home + Search */}
      <div className="flex items-center gap-8 flex-1 justify-center">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `font-medium ${
              isActive ? "text-orange-500" : "text-gray-700 hover:text-orange-500"
            }`
          }
        >
          Home
        </NavLink>

        {/* Search bar */}
        <div className="relative w-80">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search for restaurants or dishes"
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-full w-full text-sm focus:outline-none focus:border-orange-500"
          />
        </div>
      </div>

      {/* Right side - Login */}
      <NavLink
        to="/login"
        className={({ isActive }) =>
          `px-4 py-2 rounded-lg font-medium transition-colors ${
            isActive
              ? "bg-orange-600 text-white"
              : "bg-orange-500 text-white hover:bg-orange-600"
          }`
        }
      >
        Login
      </NavLink>
    </header>
  );
};

export default Header;

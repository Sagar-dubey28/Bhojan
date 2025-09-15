import { Search, ShoppingCart } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useState } from "react";

const themes = [
  "Light",
  "Dark",
  "Black",
  "Claude",
  "Corporate",
  "Ghibli",
  "Gourmet",
  "Luxury",
  "Mintlify",
  "Pastel",
  "Perplexity",
  "Shadcn",
  "Slack",
  "Soft",
  "Spotify",
  "Valorant",
  "Vscode"
];

const Header = () => {
  const [theme, setTheme] = useState("Light");
  
  const handleThemeChange = (selectedTheme) => {
    setTheme(selectedTheme);
    // Apply theme class to <html> or <body>
    document.documentElement.setAttribute("data-theme", selectedTheme.toLowerCase());
  };

  return (
    <header className="flex justify-between items-center px-10 py-5 bg-warning shadow-sm">
      {/* Left side Logo */}
      <div className="text-warning-content text-2xl font-bold">
        <NavLink to="/">🍽️ Logo</NavLink>
      </div>

      {/* Center - Home + Search */}
      <div className="flex items-center gap-8 flex-1 justify-center">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `font-medium ${
              isActive
                ? "text-orange-500"
                : "text-gray-700 hover:text-orange-500"
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

      {/* Right side - Login + Theme */}
      <div className="flex items-center gap-4">

         <NavLink
          to="/cart"
          className="p-2 rounded-lg hover:bg-orange-100 transition-colors"
        >
          <ShoppingCart className="w-6 h-6 text-orange-500" />
        </NavLink>

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

        {/* Theme dropdown */}
        <div className="relative">
          <select
            value={theme}
            onChange={(e) => handleThemeChange(e.target.value)}
            className=" py-2 rounded-lg bg-white text-lg  font-bold pl-4 focus:outline-none  text-orange-500 "
          >
            {themes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          

        </div>
      </div>
    </header>
  );
};

export default Header;

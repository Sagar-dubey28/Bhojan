import { Search, ShoppingCart } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../Context/AuthProvider";
import { useCart } from "../Context/cartContext";

const themes = [
  "light",
  "dark",
  "claude",
  "corporate",
  "ghibli",
  "gourmet",
  "Mintlify",
  "Perplexity",
  "luxury",
  "pastel",
  "slack",
  "soft",
  "spotify",
  "valorant",
  "vscode",
];

const Header = () => {
  const { user, isLogin, isAdmin, isRestaurant, isRider } = useAuth();
  const { cartItems } = useCart();
  const navigate = useNavigate();

  const [theme, setTheme] = useState(
    localStorage.getItem("BhojanTheme") || "light"
  );

  // Calculate total items in cart
  const cartItemsCount = cartItems.reduce(
    (total, item) => total + (item.quantity || 1),
    0
  );

  const handleThemeChange = (selectedTheme) => {
    setTheme(selectedTheme);
    localStorage.setItem("BhojanTheme", selectedTheme);
    document.documentElement.setAttribute("data-theme", selectedTheme);
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <header className="flex justify-between items-center px-6 py-4 bg-base-200 shadow-md">
      {/* Left - Logo */}
      <div className="text-primary text-2xl font-bold">
        <NavLink to="/">🍽️ Bhojan</NavLink>
      </div>

      {/* Center - Nav + Search (hidden on small screens) */}
      <div className="flex items-center gap-6 flex-1 justify-center max-md:hidden">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `font-medium transition-colors ${
              isActive ? "text-primary" : "text-base-content hover:text-primary"
            }`
          }
        >
          Home
        </NavLink>

        <div className="relative w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/50 w-4 h-4" />
          <input
            type="text"
            placeholder="Search for restaurants or dishes"
            aria-label="Search restaurants or dishes"
            className="input input-bordered pl-10 w-full text-sm focus:ring focus:ring-primary focus:outline-none"
          />
        </div>
      </div>

      {/* Right - Cart, Login + Theme */}
      <div className="flex items-center gap-3">
        <NavLink
          to="/addToCart"
          className="p-2 rounded-lg text-base-content relative"
          aria-label="View Cart"
        >
          <ShoppingCart className="w-6 h-6 text-base-content" />
          {cartItemsCount > 0 && (
            <div className="absolute -top-1 -right-1 bg-primary text-primary-content rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
              {cartItemsCount}
            </div>
          )}
        </NavLink>

        <div>
          {isLogin && user ? (
            <div
              className="flex gap-3 items-center cursor-pointer"
              onClick={() => {
                if (isAdmin) {
                  navigate("/adminDashboard");
                } else if (isRestaurant) {
                  navigate("/restaurantDashboard");
                } else if (isRider) {
                  navigate("/riderDashboard");
                } else {
                  navigate("/profilePage");
                }
              }}
            >
              <div className="h-12 w-12 rounded-full border overflow-hidden">
                <img
                  src={
                    isRestaurant
                      ? user?.managerImage.imageLink
                      : user?.profilePic
                  }
                  alt="userPicture"
                  className="h-full w-full rounded-full object-cover"
                />
              </div>

              <span className="text-primary text-xl">
                {isRestaurant
                  ? user?.resturantName
                  : user?.fullName?.split(" ")[0]}
              </span>
            </div>
          ) : (
            <NavLink
              to="/login"
              className={({ isActive }) =>
                `btn btn-sm ${isActive ? "btn-primary" : "btn-accent"}`
              }
            >
              Login
            </NavLink>
          )}
        </div>

        {/* Theme Selector */}
        <select
          value={theme}
          onChange={(e) => handleThemeChange(e.target.value)}
          className="select select-sm select-primary"
          aria-label="Select Theme"
        >
          {themes.map((t) => (
            <option key={t} value={t}>
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </option>
          ))}
        </select>
      </div>
    </header>
  );
};

export default Header;
